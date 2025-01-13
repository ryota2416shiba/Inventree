import apiClient from "./client";

// ログイン処理
export async function login(credentials: { email: string; password: string }) {
  const response = await apiClient.post("/auth/login/", credentials);
  const { token } = response.data;

  // セッションを保存
  setSession(token);

  return response.data;
}

// ユーザー登録処理
export async function register(userData: {
  email: string;
  password: string;
  name: string;
  accountType?: string;
  companyName?: string;
  tier?: number;
}) {
  const response = await apiClient.post("/auth/register/", userData);
  return response.data;
}

// ログアウト処理
export async function logout() {
  const response = await apiClient.post("/auth/logout/");
  removeSession();
  return response.data;
}

// セッションを保存する関数
export function setSession(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
  }
}

// セッションを削除する関数（ログアウト時に使用）
export function removeSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
  }
}

// クライアントのセッション情報を取得
export function getSession() {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("authToken");
  return token ? { token } : null;
}
