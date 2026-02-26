type fetchRespopnse<TData> = {
  success: boolean;
  data: TData | [];
  errorMsg?: string;
};

export const getRequest = async <TData>(
  url: string,
): Promise<fetchRespopnse<TData>> => {
  const token = localStorage.getItem("token") || "";

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data: TData = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error: Error | unknown) {
    console.log(error);

    return {
      success: false,
      data: [],
      errorMsg:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

// export const postRequest = async <TData, TBody>(
//   url: string,
//   method: "GET",
//   body: TBody,
// ): Promise<fetchRespopnse<TData>> => {
//   const token = localStorage.getItem("token") || "";
//   let myHeaders;

//   if (token) {
//     myHeaders = {
//       token: `Bearer ${token}`,
//     };
//   }

//   try {
//     const response = await fetch(url, {
//       method,
//       body: JSON.stringify(body),
//       headers: { "Content-Type": "application/json", ...myHeaders },
//     });

//     if (!response.ok) {
//       throw new Error(`Request failed with status ${response.status}`);
//     }

//     const data: TData = await response.json();
//     return {
//       success: true,
//       data,
//     };
//   } catch (error: Error | unknown) {
//     console.log(error);

//     return {
//       success: false,
//       errorMsg:
//         error instanceof Error ? error.message : "An unknown error occurred",
//     };
//   }
// };
