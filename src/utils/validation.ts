//입력값 검증 유틸리티

//이메일 검증

export function validateEmail(email:string): string | null {
    if(!email.trim()) {
        return "validation.email.required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)) {
        return "validation.email.invalid";

    }
    return null;
}
//전화번호 검증
export function validatePhone(phone: string): string | null {
    if(!phone.trim()) {
        return "validation.phone.required";
    }
    const phoneRegex = /^010-\d{3,4}-\d{4}$/
    if(!phoneRegex.test(phone)) {
        return "validation.phone.required";
    }
    return null;
}

//비밀번호 검증
export function validatePassword(password: string) :string | null {
    if(!password.trim()) {
        return "validation.password.required";
    }
    if(password.length<8) {
        return "validation.password.length";
    }
    return null;
}
//이름 검증
export function validateName(name: string): string | null {
    if(!name.trim()) {
        return "validation.name.required";
    }
    if(name.trim().length< 2) {
        return "validation.name.length";
    }
    return null;
}



//로그인 검증
export function validateLogin(
    email: string,
    password: string,
): string | null {
    const emailError = validateEmail(email);
    if(emailError) {
        return emailError;
    }
    const passwordError = validatePassword(password);
    if(passwordError) {
        return passwordError;
    }
    return null;
}

//회원가입 검증
export function validateRegister (
    name: string,
    email: string,
    phone: string,
    password: string,
    checked: boolean,
): string | null {

    const nameError = validateName(name);
    if(nameError) {
        return nameError;
    }
    const emailError = validateEmail(email);
    if(emailError) {
        return emailError;
    }
    const passwordError = validatePassword(password);
    if(passwordError) {
        return passwordError;
    }
    const phoneError = validatePhone(phone);
    if(phoneError) {
        return phoneError;
    }
    if(!checked) {
        return "validation.terms.required";
    }
    return null;
}