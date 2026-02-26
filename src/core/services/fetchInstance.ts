type getResponse<TData> = {
  success: boolean;
  data: TData | [];
  errorMsg?: string;
};

type PostResponse<TData=unknown> = {
  success: boolean;
  data?:TData;
  errorMsg?: string;
};



export const getRequest = async <TData>(
  url: string,
): Promise<getResponse<TData>> => {
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

export const postRequest = async <TBody,TData = unknown>(
  url: string,
  body: TBody,
): Promise<PostResponse<TData>> => {

  
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data: TData = await response.json();

    return {
      data,
      success: true,
    };

  } catch (error: Error | unknown) {

    return {
      success: false,
      errorMsg:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
