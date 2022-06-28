package it.akademija.journal;

/**
 * SUCCESSFUL_LOGIN - sėkmingas prisijungimas UNSUCCESSFUL_LOGIN - nesėkmingas
 * prisijungimas LOGOUT - atsijungimas APPLICATION_SUBMITED - pateiktas naujas
 * prašymas APPLICATION_DELETED - ištrintas prašymas MEDICAL_RECORD_SUBMITED -
 * medicininė pažyma įkelta MEDICAL_RECORD_DOWNLOADED - medicininė pažyma
 * atsisiųsta USER_CREATED - naujas naudotojas sukurtas USER_DATA_CHANGED -
 * naudotojo anketos duomenys pakeisti USER_DELETED - naudotojas ištrintas
 * KINDERGARTEN_CREATED - sukurtas naujas darželis KINDERGARTEN_UPDATED -
 * atnaujinti darželio duomenys (čia būtų gerai pridėti į entryMessage, kas buvo
 * konkrečiai padaryta: pakeistas vietų skaičius iki x, pakeistas pavadinimas,
 * pakeistas adresas - tai, ką galima padaryti su darželiu KINDERGARTEN_DELETED
 * - ištrintas darželis REGISTRATION_STARTED - prašymų registracija pradėta
 * REGISTRATION_ENDED - prašymų registracija baigta
 *
 */

public enum OperationType {
    SUCCESSFUL_LOGIN,
    UNSUCCESSFUL_LOGIN,
    LOGOUT,
    APPLICATION_SUBMITED,
    APPLICATION_DELETED,
    APPLICATION_DEACTVATED,
    APPLICATION_CONFIRMED,
    APPLICATION_REVIEWED,
    CERTIFICATE_SUBMITED,
    CERTIFICATE_DOWNLOADED,
    CERTIFICATE_DELETED,
    USER_CREATED,
    USER_DATA_CHANGED,
    USER_DELETED,
    KINDERGARTEN_CREATED,
    KINDERGARTEN_UPDATED,
    KINDERGARTEN_DELETED,
    REGISTRATION_STARTED,
    REGISTRATION_ENDED,
    QUEUE_FORMED,
    QUEUE_CONFIRMED,
    QUEUE_LOCKED,
    QUEUE_UNLOCKED,
    ERROR,
    PASSWORD_REQUEST_SENT,
    PASSWORD_REQUEST_DELETED,
    CONTRACT_DOWNLOADED,
    USER_DATA_DOWNLOADED
}
