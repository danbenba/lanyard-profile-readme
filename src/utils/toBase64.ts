export const encodeBase64 = async (
  url: string,
  size: number,
  theme: string = "dark"
): Promise<string> => {
  let response = "";

  try {
    response = await fetch(url, {
      cache: "force-cache",
    })
      .then(async (res) => {
        if (!res.ok) {
          const fallbackUrl = theme === "dark" ? "/assets/special/System.svg" : "/assets/special/Beta.svg";
          const fallbackRes = await fetch(fallbackUrl);
          if (fallbackRes.ok) {
            const blob = await fallbackRes.blob();
            const buffer = Buffer.from(await blob.arrayBuffer()) as Buffer;
            return buffer.toString("base64");
          }
          throw new Error(`not ok: ${res}`, { cause: res });
        }

        return res.blob();
      })
      .then(async (blob) => {
        const buffer = Buffer.from(await blob.arrayBuffer()) as Buffer;

        return buffer.toString("base64");
      });
  } catch (e) {
    console.log(e);
  }

  return response;
};
