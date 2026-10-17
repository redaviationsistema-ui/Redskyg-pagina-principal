import { reactive } from 'vue';
// Session memory only. Nothing is written to browser storage or analytics.
const drafts = new Map();
export const commercialNavigation = reactive({ selected: '' });
export function commercialDraft(mode) {
  if (!drafts.has(mode)) drafts.set(mode, reactive({
    form:{aircraftType:'',manufacturer:'',model:'',year:'',country:'',service:'',name:'',email:'',phone:'',comments:'',privacyAccepted:false},
    website:'',status:'idle',result:null,error:'',requestId:crypto.randomUUID(),fingerprint:'',started:false,tracked:false,
  }));
  return drafts.get(mode);
}
