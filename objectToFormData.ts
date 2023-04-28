type Args<T> = {
  obj:
    | string
    | number
    | boolean
    | Record<string, string>
    | { [key: string]: Record<string, string> }
    | { [key: string]: Record<string, string>[] }
    | Array<unknown>
    | File
    | Blob
    | T;
  rootName?: string;
  ignoreList?: string[];
};
export function objectToFormData<T>(
  obj: Args<T>["obj"],
  rootName?: Args<T>["rootName"],
  ignoreList?: Args<T>["ignoreList"]
): FormData {
  const formData = new FormData();
  function ignore(root: string | undefined) {
    return (
      Array.isArray(ignoreList) &&
      ignoreList.some(function (x) {
        return x === root;
      })
    );
  }
  function appendFormData(data: Args<T>["obj"], root: string | undefined) {
    if (!ignore(root)) {
      root = root || "";
      if (data instanceof File || data instanceof Blob) {
        formData.append(root, data);
      } else if (Array.isArray(data)) {
        data.map((value, index) => {
          appendFormData(value, `${root}[${index}]`);
        });
      } else if (typeof data === "object" && data) {
        Object.keys(data as Record<string, unknown> | string).map((key) => {
          if (data.hasOwnProperty(key)) {
            const rootKey = root === "" ? key : `${root}.${key}`;
            appendFormData((data as Record<string, any>)[key], rootKey);
          } else {
            appendFormData(
              (data as Record<string, any>)[key],
              root + "." + key
            );
          }
        });
      } else {
        if (data !== null && typeof data !== "undefined") {
          formData.append(root, data as string);
        }
      }
    }
  }
  appendFormData(obj, rootName);
  return formData;
}
