function Validation(values){

let error = {}
const id_pattern = /[a-zA-Z0-9]$/;
const password_pattern = /[a-zA-Z0-9]$/;

if(values.id === ""){
    error.id = "아이디 칸은 공백으로 두실 수 없습니다."
}else if(!id_pattern.test(values.id)){
    error.id = "아이디에는 알파벳과 숫자만 입력이 가능합니다."
}else{
    error.id = ""
}

if(values.password === ""){
    error.password = "비밀번호 칸은 공백으로 두실 수 없습니다."
}else if(!password_pattern.test(values.password)){
    error.password = "비밀번호에는 알파벳과 숫자만 입력이 가능합니다."
}else{
    error.password = ""
}
return error;


}

export default Validation