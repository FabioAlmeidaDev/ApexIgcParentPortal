export const validation = {
    required: [(v: any) => !!v || "Required"],
    email: [(v: any) => !!v || "E-mail is required", (v: any) => /.+@.+\..+/.test(v) || "E-mail must be valid"],
    dob: [(v: any) => !!v || "DOB is required", (v: any) => /(0[1-9]{1}|1[0-2]{1})\/(0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})\/(20[0-9]{2})/.test(v) || "User mm/dd/yyyy format"],
    phone: [(v: any) => !!v || "Phone number is required", (v: any) => /([0-9]{3})\-([0-9]{3})\-([0-9]{4})/.test(v) || "User 000-000-0000 format"],
    passwordLength: [(v: any) => v.length >= 8 || "Password must be at least 8 characters long"],
    pwdMatchesRules: (pwd1: any) => [(pwd2: any) => pwd1 == pwd2 || 'Password does not match'],
}

export default validation;