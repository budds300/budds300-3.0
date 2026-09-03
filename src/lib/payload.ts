import { getPayload } from "payload";
import config from "@payload-config";

export const getPayloadClient = (() => {
  const cached = getPayload({ config });
  return () => cached;
})();
