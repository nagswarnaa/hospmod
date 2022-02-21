export const appointments = {
    'f_name': '',
    'l_name': '',
    'dob': '',
    'created_date': '',
    'time': '',
    'status': '',
    'doctor_name': '',
    'docotr_ref': '',
    'staff_ref': '',
    'staff_name': '',
    'cost': '',
    'type': '',
    'appointment_ref': '',
    'patient_ref': '',
}

export const patients = {
    'visits': {
        'appointment_ref': '',
        'date': '',
        'visit_ref': '',
        'patient_ref': '',
    },
    'diagnosis': {
        'diagnosis_ref': '',
        'appointment_ref': '',
        'patient_ref': '',
        'doctor_name': '',
        'doctor_ref': '',
        'cost': '',
        'recommendations': '',
        'comments': '',
        'followup_appointment': '',
    },
    'prescriptions': {
        'prescription_ref': '',
        'date': '',
        'patient_ref': '',
        'patient_name': '',
        'doctor_name': '',
        'doctor_ref': '',
        'medications': {
            'prescription_ref': '',
            'medication_ref': '',
            'patient_ref': '',
            'patient_name': '',
            'doctor_name': '',
            'doctor_ref': '',
            'medication_name': '',
            'cost': '',
            'uses': '',
            'directions': ''
        },
    },
    'lab_tests': {
        'test_ref': '',
        'date': '',
        'lab_staff': '',
        'lab_staff_ref': '',
        'patient_ref': '',
        'patient_name': '',
        'cost': '',
        'doctor_name': '',
        'doctor_ref': '',
        'results': '',
        'type': '',
        'name': '',
    },
    'transactions': {
        'transaction_ref': '',
        'date': '',
        'patient_ref': '',
        'patient_name': '',
        'amount': '',
        'employee_ref': '',
        'status': '',
        'updated_on': '',
    },
    'f_name': '',
    'l_name': '',
    'patient_ref': '',
    'mobile': '',
    'email': '',
}

export const employees = {
    'employee_ref': '',
    'f_name': '',
    'l_name': '',
    'dob': '',
    'join_date': '',
    'title': '',
    'department': '',
    'type': '',
}

export const ROUTES = {
    HOME: '/',
    DASHBOARD: '/dashboard',
    APPOINTMENTS: '/appointments',
    PRESCRIPTIONS: '/prescriptions',
    LOGIN: '/login',
    PATIENTS: '/patients',
    DIAGNOSIS: '/diagnosis',
    TRANSACTIONS: '/transactions',
    SIGNUP: '/signUp',
    LOGIN_SIGNUP: '/login_signup',
    ADD_PRESCRIPTION: '/add-prescription',
    CREATE_TRANSACTION: '/createtransaction',
    CREATE_TRANSACTION_PATIENTS_TABLE: '/createtransaction-patientstable',
    EMPLOYEES: '/employees',
    EMPLOYEE: '/employee',
    CREATE_EMPLOYEE: '/create-employee',
    CREATE_APPOINTMENT: '/create-appointment',
    PRESCRIPTION_TABLE: '/prescriptiontable',
    PATIENTS_TABLE: '/patientstable'
}

export const COLLECTIONS = {
    PATIENTS: 'patients',
    USERS: 'users',
    PRESCRIPTIONS: 'prescriptions',
    APPOINTMENTS: 'appointments',
    DIAGNOSIS: 'diagnosis',
    EMPLOYEES: 'employees',
    VISITS: 'visits',
    TRANSACTIONS: 'transactions',
}

export const COLORS = {
    WHITE: 'var(--white)',
    MAIN: 'var(--main)',
    SECONDARY: 'var(--secondary)',
    BACKGROUND: 'var(--background)',
    DARK: 'var(--dark)',
    GREEN: 'var(--green)',
    RED: 'var(--red)',
    SHADOW: 'var(--shadow)',
    BORDER: 'var(--border)'
}


export const OPTIONS = {
    // Hospital Staff
    PATIENTS: { title: 'Patients', path: ROUTES.PATIENTS },
    APPOINTMENTS: { title: 'Appointments', path: ROUTES.APPOINTMENTS },
    VIEW_TRANSACTIONS: { title: 'View Transactions', path: ROUTES.APPOINTMENTS },
    VIEW_DIAGNOSIS: { title: 'View diagnosis', path: ROUTES.APPOINTMENTS },
    VIEW_LAB_TESTS: { title: 'View lab tests', path: ROUTES.APPOINTMENTS },
    VIEW_PRESCRIPTIONS: { title: 'View prescription', path: ROUTES.APPOINTMENTS },
}

export const SIDE_OPTIONS = {
    HOSPITAL_STAFF: {
        PATIENT: [OPTIONS.VIEW_TRANSACTIONS, OPTIONS.VIEW_DIAGNOSIS, OPTIONS.VIEW_LAB_TESTS, OPTIONS.VIEW_PRESCRIPTIONS],
        APPOINTMENTS: [],
    },
    DOCTORS: {
        PATIENTS: [OPTIONS.VIEW_DIAGNOSIS, OPTIONS.VIEW_LAB_TESTS, OPTIONS.VIEW_PRESCRIPTIONS],
    }
}

export const USER_TYPES = {
    HOSPITL_STAFF: 'hospital_staff',
    DOCTOR: 'doctor',
    PATIENT: 'patient',
    INSURANCE_STAFF: 'insurance_staff',
    LAB_STAFF: 'lab_staff',
    ADMIN: 'admin',
}

export const DBS = {
    PATIENTS: 'patients',
    PRESCRIPTIONS: 'prescriptions',
    MEDICATIONS: 'medications',

}
