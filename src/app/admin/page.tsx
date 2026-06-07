"use client";

import { useState, useEffect, useCallback } from "react";
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

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPwdChange, setShowPwdChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");

  const fetchProducts = useCallback(async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }, []);

  useEffect(() => {
    if (loggedIn) fetchProducts();
  }, [loggedIn, fetchProducts]);

  const handleLogin = async () => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setLoggedIn(true);
      localStorage.setItem("admin_auth", "1");
    } else {
      alert("密码错误");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("admin_auth") === "1") setLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setLoggedIn(false);
  };

  const handleSave = async (product: Product) => {
    setLoading(true);
    const isNew = !product.id;
    const method = isNew ? "POST" : "PUT";
    const url = "/api/products";

    const res = await fetch(url, {
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

    if (res.ok) {
      await fetchProducts();
      setEditing(null);
      setAdding(false);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定删除这个产品？")) return;
    await fetch(`/api/products?id=${id}`, { method: "DELETE" });
    await fetchProducts();
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
            <a href="/" className="text-sm text-brand-muted hover:text-brand-text">← 回网站</a>
            <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1">
              <LogOut className="w-3 h-3" /> 退出
            </button>
          </div>
        </div>

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
                      const data = await res.json();
                      if (res.ok) {
                        setPwdMsg("修改成功！新密码已生效");
                        setTimeout(() => { setShowPwdChange(false); setNewPassword(""); setPwdMsg(""); }, 1500);
                      } else {
                        setPwdMsg(data.error || "修改失败");
                      }
                    } catch { setPwdMsg("网络错误"); }
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
            <p className="text-brand-muted text-center py-12">暂无产品，点击"添加产品"开始</p>
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
        <div>
          <label className={labelClass}>图片路径</label>
          <input className={inputClass} value={product.image} onChange={e => update("image", e.target.value)} placeholder="/images/products/crane-01.jpg" />
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
