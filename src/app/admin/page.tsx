"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Trash2, Edit3, Save, X, LogIn, LogOut } from "lucide-react";

interface Product {
  id: string;
  model: string;
  brand: string;
  image: string;
  specs: {
    capacityTons: number;
    maxHeightM: number;
    workingRadiusM: number;
    year: number;
    condition: string;
  };
  description: {
    en: string;
    zh: string;
    vi: string;
    ar: string;
  };
}

const emptyProduct: Product = {
  id: "",
  model: "",
  brand: "XCMG",
  image: "/images/products/crane-01.jpg",
  specs: { capacityTons: 0, maxHeightM: 0, workingRadiusM: 0, year: 2025, condition: "used" },
  description: { en: "", zh: "", vi: "", ar: "" },
};

async function getResponseData(response: Response) {
  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof data.error === "string"
        ? data.error
        : `Request failed with HTTP ${response.status}`;
    throw new Error(message);
  }
  return data;
}

async function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit,
  timeoutMs = 15000,
) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("保存请求超时，请检查 Vercel Blob 配置后重试。");
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(
    () =>
      typeof window !== "undefined" &&
      window.localStorage.getItem("admin_auth") === "1",
  );
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPwdChange, setShowPwdChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await getResponseData(res);
    if (!Array.isArray(data)) throw new Error("Product API returned invalid data.");
    setProducts(data as Product[]);
  };

  useEffect(() => {
    if (!loggedIn) return;
    let cancelled = false;

    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await getResponseData(res);
        if (!Array.isArray(data)) {
          throw new Error("Product API returned invalid data.");
        }
        if (!cancelled) {
          setProducts(data as Product[]);
          setError("");
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load products.",
          );
        }
      }
    }

    void loadProducts();
    return () => {
      cancelled = true;
    };
  }, [loggedIn]);

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      await getResponseData(res);
      setLoggedIn(true);
      localStorage.setItem("admin_auth", "1");
      setError("");
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : "登录失败",
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setLoggedIn(false);
  };

  const handleSave = async (product: Product) => {
    setLoading(true);
    setError("");
    const isNew = !product.id;
    const method = isNew ? "POST" : "PUT";
    const url = "/api/products";

    try {
      const res = await fetchWithTimeout(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...product,
          capacityTons: product.specs.capacityTons,
          maxHeightM: product.specs.maxHeightM,
          workingRadiusM: product.specs.workingRadiusM,
          year: product.specs.year,
          descriptionEn: product.description.en,
          descriptionZh: product.description.zh,
          descriptionVi: product.description.vi,
          descriptionAr: product.description.ar,
        }),
      });
      await getResponseData(res);
      await fetchProducts();
      setEditing(null);
      setAdding(false);
    } catch (saveError) {
      const message =
        saveError instanceof Error ? saveError.message : "商品保存失败，请重试。";
      setError(message);
      window.alert(`商品保存失败：${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定删除这个产品？")) return;
    setError("");
    try {
      const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      await getResponseData(res);
      await fetchProducts();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete product.",
      );
    }
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg px-4">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-brand-border-light max-w-sm w-full">
          <h1 className="text-xl font-bold text-brand-text mb-6 text-center">产品管理后台</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="输入管理密码"
            className="w-full border border-brand-border rounded-xl px-4 py-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" /> 登录
          </button>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg py-8 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-brand-text">产品管理</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setAdding(true);
                setEditing({ ...emptyProduct });
              }}
              className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold px-5 py-2.5 rounded-xl text-sm"
            >
              <Plus className="w-4 h-4" /> 添加产品
            </button>
            <button onClick={() => setShowPwdChange(true)} className="text-sm text-brand-muted hover:text-brand-text">修改密码</button>
            <Link href="/" className="text-sm text-brand-muted hover:text-brand-text">← 回网站</Link>
            <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1">
              <LogOut className="w-3 h-3" /> 退出
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {(editing || adding) && (
          <div className="bg-white rounded-3xl p-6 mb-8 border border-brand-border-light shadow-sm">
            <ProductForm
              product={editing!}
              onChange={setEditing}
              onSave={() => handleSave(editing!)}
              onCancel={() => { setEditing(null); setAdding(false); }}
              loading={loading}
            />
          </div>
        )}

        {/* Password Change Modal */}
        {showPwdChange && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
              <h2 className="text-lg font-bold text-brand-text mb-4">修改密码</h2>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="输入新密码（至少6位）"
                className="w-full border border-brand-border rounded-xl px-4 py-2.5 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
              />
              {pwdMsg && <p className={`text-sm mb-3 ${pwdMsg.includes("成功") ? "text-green-600" : "text-red-500"}`}>{pwdMsg}</p>}
              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    if (newPassword.length < 6) { setPwdMsg("密码至少6位"); return; }
                    try {
                      const res = await fetch("/api/admin/settings", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ password: newPassword }),
                      });
                      await getResponseData(res);
                      setPwdMsg("修改成功！新密码已生效");
                      setTimeout(() => { setShowPwdChange(false); setNewPassword(""); setPwdMsg(""); }, 1500);
                    } catch (passwordError) {
                      setPwdMsg(
                        passwordError instanceof Error
                          ? passwordError.message
                          : "修改失败",
                      );
                    }
                  }}
                  className="flex-1 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-2.5 rounded-xl text-sm"
                >
                  确认修改
                </button>
                <button
                  onClick={() => { setShowPwdChange(false); setNewPassword(""); setPwdMsg(""); }}
                  className="flex-1 border border-brand-border text-brand-muted hover:text-brand-text py-2.5 rounded-xl text-sm"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {products.length === 0 && (
            <p className="text-brand-muted text-center py-12">暂无产品，请点击添加产品开始</p>
          )}
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl p-5 border border-brand-border-light flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-brand-bg-alt overflow-hidden shrink-0">
                <img src={p.image} alt={p.model} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-brand-text text-sm">{p.model}</p>
                <p className="text-xs text-brand-muted">{p.brand} · {p.specs.capacityTons}t · {p.specs.year}</p>
              </div>
              <button onClick={() => setEditing({ ...p })} className="p-2 text-brand-muted hover:text-brand-orange transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(p.id)} className="p-2 text-brand-muted hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductForm({
  product,
  onChange,
  onSave,
  onCancel,
  loading,
}: {
  product: Product;
  onChange: (p: Product) => void;
  onSave: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [uploading, setUploading] = useState(false);

  const update = (field: string, value: string | number) => {
    const parts = field.split(".");
    if (parts.length === 1) {
      onChange({ ...product, [field]: value });
    } else if (parts[0] === "specs") {
      onChange({ ...product, specs: { ...product.specs, [parts[1]]: value } });
    } else if (parts[0] === "description") {
      onChange({
        ...product,
        description: { ...product.description, [parts[1]]: value as string },
      });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await getResponseData(res);
      if (
        typeof data !== "object" ||
        data === null ||
        !("url" in data) ||
        typeof data.url !== "string"
      ) {
        throw new Error("Upload API returned invalid data.");
      }
      update("image", data.url);
    } catch (uploadError) {
      alert(
        uploadError instanceof Error ? uploadError.message : "上传失败，请重试",
      );
    } finally {
      setUploading(false);
    }
  };

  const inputClass = "w-full border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20";
  const labelClass = "text-xs text-brand-muted font-medium mb-1 block";

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className={labelClass}>型号</label>
          <input className={inputClass} value={product.model} onChange={e => update("model", e.target.value)} placeholder="QTZ125 (TC6015)" />
        </div>
        <div>
          <label className={labelClass}>品牌</label>
          <input className={inputClass} value={product.brand} onChange={e => update("brand", e.target.value)} placeholder="XCMG / 徐工" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>图片上传</label>
          <div className="flex items-center gap-3">
            <label className="cursor-pointer bg-brand-bg border border-brand-border hover:border-brand-orange px-4 py-2.5 rounded-xl text-sm text-brand-muted transition-colors">
              {uploading ? "上传中..." : "选择图片"}
              <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} className="hidden" />
            </label>
            {product.image && (
              <div className="relative group">
                <img src={product.image} alt="preview" className="h-12 w-12 rounded-lg object-cover border border-brand-border" />
              </div>
            )}
            <span className="text-[11px] text-brand-muted truncate max-w-[200px]">{product.image || "未选择图片"}</span>
          </div>
        </div>
        <div>
          <label className={labelClass}>年份</label>
          <input className={inputClass} type="number" value={product.specs.year} onChange={e => update("specs.year", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>起重量 (吨)</label>
          <input className={inputClass} type="number" value={product.specs.capacityTons} onChange={e => update("specs.capacityTons", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>最大高度 (米)</label>
          <input className={inputClass} type="number" value={product.specs.maxHeightM} onChange={e => update("specs.maxHeightM", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>工作半径 (米)</label>
          <input className={inputClass} type="number" value={product.specs.workingRadiusM} onChange={e => update("specs.workingRadiusM", e.target.value)} />
        </div>
        <div />
      </div>

      <div>
        <label className={labelClass}>产品描述（自动翻译到所有语言）</label>
        <textarea className={inputClass} rows={4} value={product.description.zh} onChange={e => {
          const v = e.target.value;
          onChange({ ...product, description: { en: v, zh: v, vi: v, ar: v } });
        }} placeholder="在这里输入中文描述，会自动填充到英文、越南文、阿拉伯文" />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button onClick={onSave} disabled={loading} className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold px-6 py-2.5 rounded-xl text-sm">
          <Save className="w-4 h-4" /> {loading ? "保存中..." : "保存"}
        </button>
        <button onClick={onCancel} className="flex items-center gap-2 text-brand-muted hover:text-brand-text px-4 py-2.5 text-sm">
          <X className="w-4 h-4" /> 取消
        </button>
      </div>
    </div>
  );
}
