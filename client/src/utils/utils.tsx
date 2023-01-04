export const getAuthorized = async (url: string, token: string) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (res.ok) {
    return res;
  } else {
    throw new Error("Błąd autoryzacji");
  }
};

export const postAuthorized = async (url: string, token: string, body: any) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (res.ok) {
    return res;
  } else {
    throw new Error("Błąd autoryzacji");
  }
};