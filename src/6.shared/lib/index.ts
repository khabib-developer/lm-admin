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
