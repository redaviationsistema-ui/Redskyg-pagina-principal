import test from 'node:test';
import assert from 'node:assert/strict';
import { reactive, nextTick } from 'vue';
import { sellerFieldValidation, validateSeller } from '../src/features/aircraft-sales/sellerSchema.js';
import { buyerFieldValidation, validateBuyer } from '../src/features/aircraft-sales/buyerSchema.js';
import { useFieldValidation } from '../src/features/aircraft-sales/useFieldValidation.js';
import { buildAircraftInquiryPayload } from '../src/features/aircraft-sales/services/aircraftInquiry.service.js';
const seller = () => ({ aircraft_type:'Jet privado', manufacturer:'Textron Aviation 2', model:'Citation XLS+', manufacturing_year:'2012', registration:'XB-ABC', serial_number:'LJ-1758', total_time:'3520.5', total_cycles:'4200', country:'México', city:'Atizapán de Zaragoza', asking_price:'', currency:'USD', price_to_be_defined:true, aircraft_status:'Operativa', contact_name:"María O’Neill-García", company:'Aviación & Co. S.A. de C.V.', email:'test@example.com', phone:'(722) 123-4567', relationship_to_aircraft:'Propietario', preferred_contact_method:'Correo electrónico', privacy_accepted:true, aircraft_notes:'Año 2012, inspección 2026.\nEquipo: A/B + GPS.' });
const buyer = () => ({ aircraft_type:'Jet privado', manufacturer_model:'Gulfstream GIV-SP', approximate_year:'', registration:'N123AB', budget_range:'undefined', primary_use:'Personal', contact_name:'José Pérez', company:'', email:'test@example.com', phone:'2125550123', country:'Côte d’Ivoire', comments:'Compra 2026: modelo + equipo.\nConsulta #2.', privacy_accepted:true });
test('accepts aviation model symbols, international registrations and serials', () => {
  for (const model of ['Citation XLS+', 'Learjet 35A', 'King Air C90GT', 'Hawker 750', 'Gulfstream GIV-SP', 'Bell 407GXi', 'SA226-T(B)', 'Model/A'])
    for (const registration of ['XB-ABC','XA-XYZ','N123AB','N4567','C-FABC','D-ABCD'])
      assert.deepEqual(sellerFieldValidation({...seller(),model,registration,serial_number:'LJ/1758-A'}).errors, {});
});
test('converts only numeric payloads and preserves text, privacy and source draft', () => {
  const input=seller(); input.total_time='3520,5'; input.price_to_be_defined=false; input.asking_price='1200000,50';
  const normalized=validateSeller(input), payload=buildAircraftInquiryPayload(normalized,'sell');
  assert.equal(payload.totalHours,'3520.5'); assert.equal(payload.totalCycles,'4200'); assert.equal(payload.askingPrice,'1200000.5');
  assert.equal(payload.privacyAccepted,true); assert.equal(payload.model,'Citation XLS+'); assert.equal(input.total_time,'3520,5');
  assert.equal(payload.comments,input.aircraft_notes);
});
test('optional purchase fields and budget to be determined are valid', () => {
  const value=validateBuyer(buyer());assert.equal(value.approximate_year,null); assert.equal(value.budget_range,'undefined');
  assert.deepEqual(buyerFieldValidation({...buyer(),registration:''}).errors,{});
});
test('reports all invalid fields individually with requested messages', () => {
  const errors=sellerFieldValidation({...seller(),model:' ', email:'invalid', manufacturing_year:'1800', total_time:'-1', total_cycles:'4.2', privacy_accepted:false, registration:'N'.repeat(21)}).errors;
  assert.equal(errors.model,'Este campo es obligatorio');assert.equal(errors.email,'Ingresa un correo electrónico válido');
  assert.equal(errors.manufacturing_year,'Ingresa un año de fabricación válido'); assert.equal(errors.total_time,'Ingresa las horas de vuelo utilizando números');
  assert.equal(errors.total_cycles,'Ingresa un número entero de ciclos');assert.equal(errors.registration,'Revisa la matrícula ingresada');assert.ok(errors.privacy_accepted);
});
test('rejects malformed numeric forms, letters, negative hours and invalid years', () => {
  for (const value of ['letters','-1','Infinity','0x10','1e3','1,234.56']) assert.ok(sellerFieldValidation({...seller(),total_time:value}).errors.total_time);
  for (const value of ['letters','4.2','-1']) assert.ok(sellerFieldValidation({...seller(),total_cycles:value}).errors.total_cycles);
  for (const value of ['20300','20e2','2012.0','3000']) assert.ok(buyerFieldValidation({...buyer(),approximate_year:value}).errors.approximate_year);
  for (const value of ['0','-1','']) assert.ok(sellerFieldValidation({...seller(),price_to_be_defined:false,asking_price:value}).errors.asking_price);
  assert.equal(sellerFieldValidation({...seller(),asking_price:'invalid',price_to_be_defined:true}).values.asking_price,null);
});
test('rejects wrong types and overlong text without accepting administrative fields', () => {
  assert.throws(()=>validateBuyer({...buyer(),phone:12345}));
  assert.throws(()=>validateSeller({...seller(),aircraft_notes:'a'.repeat(4001)}));
  assert.equal(validateSeller({...seller(),admin_notes:'unsafe',submission_status:'accepted'}).admin_notes,undefined);
});
test('touched errors clear during correction and privacy is recognized immediately', async () => {
  const form=reactive({...buyer(),email:'bad',privacy_accepted:false}), ui=useFieldValidation(form,buyerFieldValidation);
  ui.onBlur({target:{dataset:{field:'email'}}});assert.ok(ui.fieldErrors.email);
  form.email='fixed@example.com';ui.onEdit({target:{dataset:{field:'email'}}});await nextTick();assert.equal(ui.fieldErrors.email,undefined);
  ui.onBlur({target:{dataset:{field:'privacy_accepted'}}});assert.ok(ui.fieldErrors.privacy_accepted);
  form.privacy_accepted=true;ui.onEdit({target:{dataset:{field:'privacy_accepted'}}});await nextTick();assert.equal(ui.fieldErrors.privacy_accepted,undefined);
});
test('submit shows errors, focuses first DOM field and blocks invalid data', async () => {
  const form=reactive({...buyer(),email:'bad',privacy_accepted:false}), ui=useFieldValidation(form,buyerFieldValidation);let focused=false,scrolled=false;
  const event={target:{querySelectorAll:()=>[{dataset:{field:'email'},scrollIntoView:()=>scrolled=true,focus:()=>focused=true}]}};
  assert.equal(await ui.checkFields(event),false);assert.equal(focused,true);assert.equal(scrolled,true);assert.equal(ui.fieldAttrs('email')['aria-invalid'],'true');
  form.email='valid@example.com';form.privacy_accepted=true;assert.equal(await ui.checkFields(event),true);assert.deepEqual({...ui.fieldErrors},{});
});

test('both forms accept exactly ten phone digits without a country prefix', () => {
  for (const [fixture, validate] of [[buyer,validateBuyer],[seller,validateSeller]]) {
    for (const phone of ['7221234567','722 123 4567','(722) 123-4567']) assert.equal(validate({...fixture(),phone}).phone,'7221234567');
    for (const phone of ['722123456','72212345678','+52 7221234567','722abc4567']) {
      assert.throws(()=>validate({...fixture(),phone}), /10 dígitos/);
    }
  }
});
