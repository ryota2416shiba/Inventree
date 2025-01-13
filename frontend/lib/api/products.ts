import apiClient from "./client";

// 商品リストを取得
export async function getProducts(params?: { category?: string; search?: string }) {
  try {
    const response = await apiClient.get("/products/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

// 商品詳細を取得
export async function getProduct(id: string) {
  try {
    const response = await apiClient.get(`/products/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

// 商品を作成（修正）
export async function createProduct(data: FormData) {
  try {
    const response = await apiClient.post("/products/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status !== 201) {
      throw new Error(`商品登録に失敗しました (Status: ${response.status})`);
    }

    return response.data;
  } catch (error: any) {
    console.error("Error creating product:", error);

    // サーバーからのエラーメッセージを取得
    if (error.response) {
      throw new Error(error.response.data?.detail || "商品登録に失敗しました");
    } else if (error.request) {
      throw new Error("サーバーに接続できませんでした");
    } else {
      throw new Error(error.message);
    }
  }
}

// 商品を更新
export async function updateProduct(id: string, data: FormData) {
  try {
    const response = await apiClient.put(`/products/${id}/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status !== 200) {
      throw new Error(`商品更新に失敗しました (Status: ${response.status})`);
    }

    return response.data;
  } catch (error: any) {
    console.error(`Error updating product ${id}:`, error);

    if (error.response) {
      throw new Error(error.response.data?.detail || "商品更新に失敗しました");
    } else if (error.request) {
      throw new Error("サーバーに接続できませんでした");
    } else {
      throw new Error(error.message);
    }
  }
}
