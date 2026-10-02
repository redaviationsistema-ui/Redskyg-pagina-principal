import { supabase } from "../../../supabase";

const AIRCRAFT = "aircraft_sales";
const IMAGES = "aircraft_sales_images";
const INQUIRIES = "aircraft_sales_inquiries";
const STORAGE_BUCKET = "aircraft-sales";

function resolveImageUrl(image) {
  if (image?.public_url) {
    return image.public_url;
  }

  if (!image?.storage_path) {
    return null;
  }

  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(image.storage_path);

  return data?.publicUrl ?? null;
}

const formatPrice = (value) => {
  if (!value) return null;

  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) return null;

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(number);
};

export async function listPublicAircraft() {
  const { data, error } = await supabase
    .from(AIRCRAFT)
    .select(`
      *,
      images:${IMAGES} (
        id,
        public_url,
        storage_path,
        is_cover,
        is_active,
        display_order
      )
    `)
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error cargando aeronaves:", error);
    throw error;
  }

  return (data ?? []).map((aircraft) => {
    const activeImages = (aircraft.images ?? [])
      .filter((image) => image.is_active)
      .map((image) => ({
        ...image,
        resolved_url: resolveImageUrl(image),
      }))
      .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
    const cover = activeImages.find((image) => image.is_cover);
    const formattedPrice = formatPrice(aircraft.price);

    return {
      ...aircraft,
      type: aircraft.model || aircraft.manufacturer || "Sin clasificar",
      price_label: formattedPrice ? `${aircraft.currency || "USD"} $${formattedPrice}` : "Consultar",
      price_value: Number(aircraft.price || 0),
      main_image: cover?.resolved_url ?? null,
      images: activeImages,
    };
  });
}

export async function createAircraftInquiry(payload) {
  const { data, error } = await supabase
    .from(INQUIRIES)
    .insert({
      aircraft_sale_id: payload.aircraft_sale_id,
      name: payload.name.trim(),
      email: payload.email.trim(),
      phone: payload.phone?.trim() || null,
      message: payload.message?.trim() || null,
      status: payload.status || "new",
      email_verified: payload.email_verified ?? false,
      verified_email: payload.verified_email?.trim() || null,
      pdf_sent: payload.pdf_sent ?? false,
      pdf_sent_at: payload.pdf_sent_at ?? null,
      email_status: payload.email_status || "pending",
    })
    .select()
    .single();

  if (error) {
    console.error("Error enviando solicitud:", error);
    throw error;
  }

  return data;
}

export async function sendAircraftPdf(inquiryId) {
  const { data, error } = await supabase.functions.invoke("send-aircraft-pdf", {
    body: {
      inquiry_id: inquiryId,
    },
  });

  if (error) {
    console.error("Error enviando PDF de aeronave:", error);
    throw error;
  }

  return data;
}

export async function sendAircraftInquiryEmail(payload) {
  const endpoint =
    import.meta.env.VITE_AIRCRAFT_SALES_ENDPOINT ||
    "https://redskyg.com/aircraft_sales.php";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  console.log("AIRCRAFT EMAIL RESPONSE:", data);

  if (!response.ok || !data.success) {
    throw new Error(
      data.exception ||
        data.phpmailer_error ||
        data.message ||
        "Error enviando correo"
    );
  }

  return data;
}

export async function sendAircraftEmailOtp(email) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) throw error;
}

export async function verifyAircraftEmailOtp(email, token) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) throw error;

  return data;
}
