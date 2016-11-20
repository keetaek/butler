const { isEmpty, reduce } = require('lodash');
const moment = require('moment');

export function mapIncomingGuest(rawData) {
  if (isEmpty(rawData)) {
    return null;
  }

  return {
    id: rawData.id,
    firstName: rawData.first_name,
    lastName: rawData.last_name,
    nickname: rawData.nickname,
    // Why changing date format? To conform to RFC3339
    birthdate: rawData.birthdate ? moment.utc(rawData.birthdate).format('YYYY-MM-DD') : null,
    gender: rawData.gender,
    genderNote: rawData.gender_note,
    emergencyContactName: rawData.emergency_contact_name,
    emergencyContactPhone: rawData.emergency_contact_phone,
    identificationType: rawData.identification_type,
    identificationValue: rawData.identification_value,
    identificationNeedBy: rawData.identification_need_by ? moment.utc(rawData.identification_need_by).format('YYYY-MM-DD') : null,
    identificationNote: rawData.identification_note,
    intakeFormCollectDate: rawData.intake_form_collect_date ? moment.utc(rawData.intake_form_collect_date).format('YYYY-MM-DD') : null,
    intakeFormCollectedBy: rawData.intake_form_collected_by
  };
}

export function mapIncomingGuests(rawData) {
  if (isEmpty(rawData)) {
    return [];
  }
  return rawData.map(mapIncomingGuest);
}

export function buildGuestPayLoad(data) {
  if (isEmpty(data)) {
    return null;
  }
  return {
    first_name: data.firstName,
    last_name: data.lastName,
    nickname: data.nickname,
    birthdate: data.birthdate ? moment(data.birthdate).format('YYYY-MM-DD') : '',
    gender: data.gender,
    gender_note: data.genderNote,
    emergency_contact_name: data.emergencyContactName,
    emergency_contact_phone: data.emergencyContactPhone,
    identification_type: data.identificationType,
    identification_value: data.identificationValue,
    identification_need_by: data.identificationNeedBy ? moment(data.identificationNeedBy).format('YYYY-MM-DD') : '',
    identification_note: data.identificationNote,
    intake_form_collect_date: data.intakeFormCollectDate ? moment(data.intakeFormCollectDate).format('YYYY-MM-DD') : '',
    intake_form_collected_by: data.intakeFormCollectedBy
  };
}

export function createdIdBasedData(rawData) {
  if (isEmpty(rawData)) {
    return {};
  }

  return reduce(rawData, (result, value) => {
    const id = value.id;
    result[id] = value;
    return result;
  }, {});
}
