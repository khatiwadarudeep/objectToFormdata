"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectToFormData = void 0;
function objectToFormData(obj, rootName, ignoreList) {
    const formData = new FormData();
    function ignore(root) {
        return (Array.isArray(ignoreList) &&
            ignoreList.some(function (x) {
                return x === root;
            }));
    }
    function appendFormData(data, root) {
        if (!ignore(root)) {
            root = root || "";
            if (data instanceof File || data instanceof Blob) {
                formData.append(root, data);
            }
            else if (Array.isArray(data)) {
                data.map((value, index) => {
                    appendFormData(value, `${root}[${index}]`);
                });
            }
            else if (typeof data === "object" && data) {
                Object.keys(data).map((key) => {
                    if (data.hasOwnProperty(key)) {
                        const rootKey = root === "" ? key : `${root}.${key}`;
                        appendFormData(data[key], rootKey);
                    }
                    else {
                        appendFormData(data[key], root + "." + key);
                    }
                });
            }
            else {
                if (data !== null && typeof data !== "undefined") {
                    formData.append(root, data);
                }
            }
        }
    }
    appendFormData(obj, rootName);
    return formData;
}
exports.objectToFormData = objectToFormData;
