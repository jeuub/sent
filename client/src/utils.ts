import bridge from "@vkontakte/vk-bridge";
import { func } from "prop-types";

// interface CallbackOneParam<T1, T2 = void> {
//   (param1: T1): T2;
// }

let themeSetter: Function;

export function updateThemeSetter(callback:Function) {
  themeSetter = callback;
}

export function setTheme(_theme:string) {
  localStorage.setItem("appTheme", _theme);
  themeSetter(_theme);
}

export function getTheme() {
  return !!localStorage.getItem("appTheme") ? localStorage.getItem("appTheme")+"" : "";
}

export function updateApiToken() {
  return bridge.send("VKWebAppGetAuthToken", {
    app_id: 8013137, // current mini app id
    scope: "",
  }).then(data => {
    localStorage.setItem("vk-api-token", data.access_token);
    return data.access_token;
  }).catch(err => {
    console.log("Token getting error");
    return null;
  });
}

export function getUsersData(users:any[], fields:string[] = ["photo_50"]) {
    return bridge
        .send("VKWebAppCallAPIMethod", {
          method: "users.get",
          request_id: "respects-my",
          params: {
            v: "5.131",
            access_token: String(localStorage.getItem("vk-api-token")),
            user_ids: users.map((val: any) => val?.vkid).join(), // id в строке через запятую
            fields: fields.join(), // дополнительные поля
            name_case: "gen", // родительный падеж
          },
        })
        .then((data) => {
          return data?.response
        })
        .catch((error) => {
          if (error?.error_data?.error_reason?.error_code == 5) {
            updateApiToken();
          }
          else console.error(error);
          return null;
        });
}