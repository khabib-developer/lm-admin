export const formatCardNumber = (value: string) => {
  const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
  const onlyNumbers = value.replace(/[^\d]/g, "");

  return onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
    [$1, $2, $3, $4].filter((group) => !!group).join(" ")
  );
};
export function formatPhoneNumber(phoneNumberString: string) {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(998|)?(\d{2})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = match[1] ? "+998 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }
  return null;
}
export function formattedNumber(x: number) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
}

export function downloadFile(url: string): void {
  const anchor: HTMLAnchorElement = document.createElement("a");
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.href = url;
  anchor.setAttribute("download", "");
  anchor.click();
  document.body.removeChild(anchor);
}


export function roundBigNumbers(number: number) {
  if(number > 999 && number < 999999) return String(Math.ceil(number / 100) / 10) + 'k'
  else if(number > 999999 && number < 999999999) return String(Math.ceil(number / 100000) / 10) + 'm'
  else if(number > 999999999) return String(Math.ceil(number / 100000000) / 10) + 'b'
  else if(number <= 999) return number
  else return "∞" 
}
