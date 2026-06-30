
// import { useState, useRef, useEffect, useCallback } from "react";
// import {
//   Plus, Pencil, Trash2, Search, Upload,
//   X, Package, ChevronDown, ImagePlus, RefreshCw, AlertCircle,
// } from "lucide-react";


// const BASE = import.meta.env.VITE_API_BASE ?? "http://127.0.0.1:8000";

// const WEIGHTS = ["11g","51g","40g", "80g", "120g", "200g", "500g"];

// const STATUS_STYLE = {
//   Active:   { bg: "#dcfce7", color: "#16a34a" },
//   Inactive: { bg: "#fee2e2", color: "#dc2626" },
// };

// const STOCK_STYLE = {
//   in_stock:     { label: "In Stock",     color: "#16a34a" },
//   low_stock:    { label: "Low Stock",    color: "#d97706" },
//   out_of_stock: { label: "Out of Stock", color: "#dc2626" },
// };

// const EMPTY_FORM = {
//   name: "", tagline: "", description: "",
//   bg_color: "#1E5C2A", burst_light_color: "#2D7A3A", burst_dark_color: "#144020",
//   rating: "4.5", reviews_count: "0", is_active: true,
//   weight: "", price: "", stock_status: "in_stock", stock_quantity: "0",
//   tag: "", is_default: true,
//   imageFile: null, imagePreviewUrl: null,
// };

// const getToken = () =>
//   localStorage.getItem("admin_access_token") ?? sessionStorage.getItem("access_token") ?? "";

// const authHeaders = (isFormData = false) => {
//   const h = { Authorization: `Bearer ${getToken()}` };
//   if (!isFormData) h["Content-Type"] = "application/json";
//   return h;
// };

// async function apiFetch(path, opts = {}) {
//   const res = await fetch(`${BASE}/api${path}`, opts);
//   if (!res.ok) {
//     const err = await res.json().catch(() => ({}));
//     throw new Error(err.detail ?? `Error ${res.status}`);
//   }
//   if (res.status === 204) return null;
//   return res.json();
// }

// function flattenProduct(p) {
//   const defaultVariant = p.variants?.find((v) => v.is_default) ?? p.variants?.[0] ?? {};
//   return {
//     id: p.id,
//     name: p.name,
//     tagline: p.tagline ?? "",
//     description: p.description ?? "",
//     price: defaultVariant.price ? Number(defaultVariant.price) : 0,
//     stock: defaultVariant.stock_quantity ?? 0,
//     stock_status: defaultVariant.stock_status ?? "in_stock",
//     status: p.is_active ? "Active" : "Inactive",
//     image: p.image ?? null,
//     bg_color: p.bg_color,
//     burst_light_color: p.burst_light_color,
//     burst_dark_color: p.burst_dark_color,
//     rating: p.rating,
//     reviews_count: p.reviews_count,
//     variants: p.variants ?? [],
//     defaultVariant,
//   };
// }

// export default function AdminProducts() {
//   const [rows, setRows]         = useState([]);
//   const [loading, setLoading]   = useState(true);
//   const [error, setError]       = useState(null);
//   const [saving, setSaving]     = useState(false);
//   const [deleting, setDeleting] = useState(null);
//   const [search, setSearch]     = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [editRow, setEditRow]   = useState(null);
//   const [form, setForm]         = useState(EMPTY_FORM);
//   const [weightManual, setWeightManual] = useState(false);
//   const [showPreview, setShowPreview] = useState(false); // mobile preview toggle
//   const fileRef = useRef();

//   // detect mobile
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   useEffect(() => {
//     const onResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   const fetchProducts = useCallback(async () => {
//     setLoading(true); setError(null);
//     try {
//       const data = await apiFetch("/admin/products/", { headers: authHeaders() });
//       setRows(data.map(flattenProduct));
//     } catch (e) { setError(e.message); }
//     finally { setLoading(false); }
//   }, []);

//   useEffect(() => { fetchProducts(); }, [fetchProducts]);

//   const filtered = rows.filter(p =>
//     p.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const openAdd = () => {
//     setEditRow(null); setForm(EMPTY_FORM); setShowForm(true); setShowPreview(false);
//   };

//   const openEdit = (p) => {
//     const dv = p.defaultVariant;
//     setEditRow(p);
//     setForm({
//       name: p.name, tagline: p.tagline, description: p.description,
//       bg_color: p.bg_color, burst_light_color: p.burst_light_color, burst_dark_color: p.burst_dark_color,
//       rating: String(p.rating), reviews_count: String(p.reviews_count),
//       is_active: p.status === "Active",
//       weight: dv.weight ?? "", price: dv.price ? String(dv.price) : "",
//       stock_status: dv.stock_status ?? "in_stock",
//       stock_quantity: String(dv.stock_quantity ?? 0),
//       tag: dv.tag ?? "", is_default: dv.is_default ?? true,
//       imageFile: null, imagePreviewUrl: p.image,
//     });
//     setShowForm(true); setShowPreview(false);
//   };

//   const handleFiles = (files) => {
//     const file = files[0]; if (!file) return;
//     const url = URL.createObjectURL(file);
//     setForm(prev => ({ ...prev, imageFile: file, imagePreviewUrl: url }));
//   };

//   const handleSave = async () => {
//     if (!form.name || !form.price) return alert("Name and price are required.");
//     setSaving(true);
//     try {
//       const fd = new FormData();
//       ["name","tagline","description","bg_color","burst_light_color","burst_dark_color","rating","reviews_count"].forEach(k => fd.append(k, form[k]));
//       fd.append("is_active", form.is_active ? "true" : "false");
//       if (form.imageFile) fd.append("image", form.imageFile);

//       let product;
//       if (editRow) {
//         product = await apiFetch(`/admin/products/${editRow.id}/`, { method:"PATCH", headers: authHeaders(true), body: fd });
//       } else {
//         product = await apiFetch("/admin/products/", { method:"POST", headers: authHeaders(true), body: fd });
//       }

//       const variantPayload = {
//         product: product.id, weight: form.weight || "80g",
//         price: Number(form.price), tag: form.tag,
//         stock_status: form.stock_status, stock_quantity: Number(form.stock_quantity), is_default: true,
//       };

//       if (editRow && editRow.defaultVariant?.id) {
//         await apiFetch(`/admin/variants/${editRow.defaultVariant.id}/`, { method:"PATCH", headers: authHeaders(), body: JSON.stringify(variantPayload) });
//       } else {
//         await apiFetch("/admin/variants/", { method:"POST", headers: authHeaders(), body: JSON.stringify(variantPayload) });
//       }

//       await fetchProducts();
//       setShowForm(false);
//     } catch (e) { alert(`Save failed: ${e.message}`); }
//     finally { setSaving(false); }
//   };

//   const deleteProduct = async (id) => {
//     if (!confirm("Delete this product?")) return;
//     setDeleting(id);
//     try {
//       await apiFetch(`/admin/products/${id}/`, { method:"DELETE", headers: authHeaders() });
//       setRows(prev => prev.filter(p => p.id !== id));
//     } catch (e) { alert(`Delete failed: ${e.message}`); }
//     finally { setDeleting(null); }
//   };

//   const field = (key) => ({
//     value: form[key],
//     onChange: (e) => setForm(prev => ({ ...prev, [key]: e.target.value })),
//   });

//   // ── Preview Panel ──────────────────────────────────────────────────────
//   const PreviewPanel = () => (
//     <div style={s.previewCard}>
//       <p style={s.sectionLabel}>Preview</p>
//       <p style={s.sectionSub}>How it looks in the listing.</p>
//       <div style={{ ...s.previewMain, backgroundColor: form.bg_color }}>
//         {form.imagePreviewUrl
//           ? <img src={form.imagePreviewUrl} alt="" style={s.previewImg} />
//           : <div style={s.previewPlaceholder}>
//               <ImagePlus size={28} color="rgba(255,255,255,0.4)" />
//               <p style={{ color:"rgba(255,255,255,0.5)", fontSize:12, marginTop:6 }}>No image yet</p>
//             </div>
//         }
//       </div>
//       <div style={{ marginTop:12 }}>
//         <p style={s.previewName}>{form.name || "Product Name"}</p>
//         <p style={s.previewCat}>{form.tagline || "Tagline goes here"}</p>
//         {form.tag && <span style={s.previewTag}>{form.tag}</span>}
//         <div style={s.previewPriceRow}>
//           {form.price && <span style={s.previewPrice}>₹{form.price}</span>}
//           {form.weight && <span style={s.previewWeight}>{form.weight}</span>}
//         </div>
//         <p style={{ fontSize:11, marginTop:4, color: STOCK_STYLE[form.stock_status]?.color ?? "#374151" }}>
//           {STOCK_STYLE[form.stock_status]?.label ?? ""}
//           {form.stock_quantity > 0 && ` · ${form.stock_quantity} units`}
//         </p>
//       </div>
//     </div>
//   );

//   return (
//     <div style={s.page}>
//       {/* ── Header ── */}
//       <div style={s.pageHeader}>
//         <div>
//           <h1 style={s.pageTitle}>Products</h1>
//           <p style={s.pageSubtitle}>Manage your product catalogue.</p>
//         </div>
//         <div style={{ display:"flex", gap:8 }}>
//           <button style={s.refreshBtn} onClick={fetchProducts}><RefreshCw size={14} /></button>
//           <button style={s.addBtn} onClick={openAdd}><Plus size={14} /> Add Product</button>
//         </div>
//       </div>

//       {/* ── Error banner ── */}
//       {error && (
//         <div style={s.errorBanner}>
//           <AlertCircle size={14} /> {error}
//           <button style={s.retryBtn} onClick={fetchProducts}>Retry</button>
//         </div>
//       )}

//       {/* ── Product list ── */}
//       <div style={s.card}>
//         <div style={s.cardHeader}>
//           <div>
//             <h2 style={s.cardTitle}>Product List</h2>
//             <p style={s.cardSubtitle}>{loading ? "Loading…" : `${filtered.length} products`}</p>
//           </div>
//           <div style={s.searchWrap}>
//             <Search size={13} color="#9ca3af" />
//             <input style={s.searchInput} placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} />
//           </div>
//         </div>

//         <div style={s.tableWrap}>
//           {loading ? (
//             <div style={s.loadingRow}>Loading products…</div>
//           ) : (
//             <table style={s.table}>
//               <thead>
//                 <tr>
//                   {["#","Product","Price","Stock","Status","Actions"].map(h => (
//                     <th key={h} style={s.th}>{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.length === 0 ? (
//                   <tr><td colSpan={6} style={{ ...s.td, textAlign:"center", color:"#9ca3af", padding:32 }}>
//                     No products found.
//                   </td></tr>
//                 ) : filtered.map((p, i) => (
//                   <tr key={p.id} style={s.tr}>
//                     <td style={s.td}><span style={s.rowNum}>{String(i+1).padStart(2,"0")}</span></td>
//                     <td style={s.td}>
//                       <div style={s.productCell}>
//                         <div style={s.productThumb}>
//                           {p.image
//                             ? <img src={p.image} alt="" style={s.thumbImg} />
//                             : <Package size={14} color="#9ca3af" />}
//                         </div>
//                         <div>
//                           <span style={s.productName}>{p.name}</span>
//                           {p.tagline && <p style={s.productTagline}>{p.tagline}</p>}
//                         </div>
//                       </div>
//                     </td>
//                     <td style={s.td}><span style={s.price}>₹{p.price}</span></td>
//                     <td style={s.td}>
//                       <span style={{ color: STOCK_STYLE[p.stock_status]?.color ?? "#374151", fontWeight:500, fontSize:11 }}>
//                         {STOCK_STYLE[p.stock_status]?.label ?? p.stock_status}
//                       </span>
//                     </td>
//                     <td style={s.td}>
//                       <span style={{ ...s.statusBadge, ...STATUS_STYLE[p.status] }}>{p.status}</span>
//                     </td>
//                     <td style={s.td}>
//                       <div style={s.actions}>
//                         <button style={{ ...s.actionBtn, color:"#d97706" }} onClick={() => openEdit(p)}><Pencil size={14} /></button>
//                         <button
//                           style={{ ...s.actionBtn, color: deleting===p.id ? "#9ca3af" : "#dc2626" }}
//                           disabled={deleting===p.id}
//                           onClick={() => deleteProduct(p.id)}
//                         ><Trash2 size={14} /></button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>

//       {/* ── Drawer ── */}
//       {showForm && (
//         <div style={s.overlay} onClick={() => setShowForm(false)}>
//           <div style={s.drawer} onClick={e => e.stopPropagation()}>

//             {/* Drawer header */}
//             <div style={s.drawerHeader}>
//               <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//                 <div style={s.drawerIconWrap}><Package size={16} color="#E8472A" /></div>
//                 <h2 style={s.drawerTitle}>{editRow ? "Edit Product" : "Add Product"}</h2>
//               </div>
//               <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//                 {/* Mobile preview toggle */}
//                 {isMobile && (
//                   <button
//                     style={{ ...s.previewToggleBtn, background: showPreview ? "#E8472A" : "#f3f4f6", color: showPreview ? "#fff" : "#374151" }}
//                     onClick={() => setShowPreview(v => !v)}
//                   >
//                     {showPreview ? "← Form" : "Preview →"}
//                   </button>
//                 )}
//                 <button
//                   style={s.saveBtn}
//                   onClick={handleSave}
//                   disabled={saving}
//                 >
//                   {saving ? "Saving…" : editRow ? "Update" : "Save"}
//                 </button>
//                 <button style={s.closeBtn} onClick={() => setShowForm(false)}><X size={16} /></button>
//               </div>
//             </div>

//             {/* Body */}
//             <div style={{ ...s.drawerBody, gridTemplateColumns: isMobile ? "1fr" : "1fr 260px" }}>

//               {/* Show form or preview on mobile */}
//               {(!isMobile || !showPreview) && (
//                 <div style={s.formCol}>

//                   {/* Basic Info */}
//                   <div style={s.formCard}>
//                     <p style={s.sectionLabel}>Basic Information</p>

//                     <div style={{ ...s.row2, gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
//                       <div style={s.fieldWrap}>
//                         <label style={s.label}>Product Name *</label>
//                         <input style={s.input} placeholder="e.g. Himalayan Salt Makhana" {...field("name")} />
//                       </div>
//                       <div style={s.fieldWrap}>
//                         <label style={s.label}>Tagline</label>
//                         <input style={s.input} placeholder="e.g. Light. Crunchy." {...field("tagline")} />
//                       </div>
//                     </div>

//                     <div style={{ ...s.row2, gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
//                       <div style={s.fieldWrap}>
//   <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//     <label style={s.label}>Weight</label>
//     <button
//       type="button"
//       onClick={() => setWeightManual(v => !v)}
//       style={{
//         background: "none", border: "none", cursor: "pointer",
//         fontSize: 10, fontWeight: 600, color: "#E8472A",
//         fontFamily: "Inter, sans-serif", padding: 0,
//       }}
//     >
//       {weightManual ? "Use dropdown" : "Enter manually"}
//     </button>
//   </div>

//   {weightManual ? (
//     <input
//       style={s.input}
//       placeholder="e.g. 75g"
//       {...field("weight")}
//     />
//   ) : (
//     <div style={s.selectWrap}>
//       <select style={s.select} {...field("weight")}>
//         <option value="">Select weight</option>
//         {WEIGHTS.map(w => <option key={w}>{w}</option>)}
//       </select>
//       <ChevronDown size={13} style={s.chevron} />
//     </div>
//   )}
// </div>
//                       <div style={s.fieldWrap}>
//                         <label style={s.label}>Tag / Badge</label>
//                         <input style={s.input} placeholder="e.g. BESTSELLER" {...field("tag")} />
//                       </div>
//                     </div>

//                     <div style={{ ...s.row2, gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
//                       <div style={s.fieldWrap}>
//                         <label style={s.label}>Selling Price (₹) *</label>
//                         <input style={s.input} placeholder="199" type="number" {...field("price")} />
//                       </div>
//                       <div style={s.fieldWrap}>
//                         <label style={s.label}>Stock Quantity</label>
//                         <input style={s.input} placeholder="100" type="number" {...field("stock_quantity")} />
//                       </div>
//                     </div>

//                     <div style={{ ...s.row2, gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
//                       <div style={s.fieldWrap}>
//                         <label style={s.label}>Stock Status</label>
//                         <div style={s.selectWrap}>
//                           <select style={s.select} {...field("stock_status")}>
//                             <option value="in_stock">In Stock</option>
//                             <option value="low_stock">Low Stock</option>
//                             <option value="out_of_stock">Out of Stock</option>
//                           </select>
//                           <ChevronDown size={13} style={s.chevron} />
//                         </div>
//                       </div>
//                       <div style={s.fieldWrap}>
//                         <label style={s.label}>Status</label>
//                         <div style={s.selectWrap}>
//                           <select
//                             style={s.select}
//                             value={form.is_active ? "Active" : "Inactive"}
//                             onChange={e => setForm(prev => ({ ...prev, is_active: e.target.value === "Active" }))}
//                           >
//                             <option>Active</option>
//                             <option>Inactive</option>
//                           </select>
//                           <ChevronDown size={13} style={s.chevron} />
//                         </div>
//                       </div>
//                     </div>

//                     <div style={{ ...s.row2, gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
//                       <div style={s.fieldWrap}>
//                         <label style={s.label}>Rating</label>
//                         <input style={s.input} placeholder="4.5" type="number" step="0.1" min="0" max="5" {...field("rating")} />
//                       </div>
//                       <div style={s.fieldWrap}>
//                         <label style={s.label}>Reviews Count</label>
//                         <input style={s.input} placeholder="0" type="number" {...field("reviews_count")} />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Theme Colors */}
//                   <div style={s.formCard}>
//                     <p style={s.sectionLabel}>Theme Colors</p>
//                     <p style={s.sectionSub}>Hero / burst ray background colors.</p>
//                     <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap:10 }}>
//                       {[
//                         { key:"bg_color", label:"Background" },
//                         { key:"burst_light_color", label:"Burst Light" },
//                         { key:"burst_dark_color", label:"Burst Dark" },
//                       ].map(({ key, label }) => (
//                         <div key={key} style={s.fieldWrap}>
//                           <label style={s.label}>{label}</label>
//                           <div style={s.colorRow}>
//                             <input type="color" value={form[key]}
//                               onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
//                               style={s.colorPicker} />
//                             <input style={{ ...s.input, flex:1 }} {...field(key)} />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <div style={s.formCard}>
//                     <p style={s.sectionLabel}>Description</p>
//                     <textarea
//                       style={{ ...s.input, height:80, resize:"vertical" }}
//                       placeholder="Describe the product…"
//                       {...field("description")}
//                     />
//                   </div>

//                   {/* Image Upload */}
//                   <div style={s.formCard}>
//                     <p style={s.sectionLabel}>Product Image</p>
//                     <p style={s.sectionSub}>PNG, JPG up to 5MB.</p>
//                     <div
//                       style={s.dropZone}
//                       onClick={() => fileRef.current.click()}
//                       onDragOver={e => e.preventDefault()}
//                       onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
//                     >
//                       <Upload size={22} color="#9ca3af" style={{ marginBottom:6 }} />
//                       <p style={s.dropText}>Click to upload or drag & drop</p>
//                       <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }}
//                         onChange={e => handleFiles(e.target.files)} />
//                     </div>
//                     {form.imagePreviewUrl && (
//                       <div style={s.thumbStrip}>
//                         <div style={s.thumbItem}>
//                           <img src={form.imagePreviewUrl} alt="" style={s.thumbImg} />
//                           <button style={s.thumbRemove}
//                             onClick={() => setForm(prev => ({ ...prev, imageFile:null, imagePreviewUrl:null }))}>
//                             <X size={10} />
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Footer */}
//                   <div style={s.formFooter}>
//                     <button style={s.cancelBtn} onClick={() => setShowForm(false)} disabled={saving}>Cancel</button>
//                     <button style={{ ...s.saveBtn, opacity: saving ? 0.7 : 1 }} onClick={handleSave} disabled={saving}>
//                       {saving ? "Saving…" : editRow ? "Update Product" : "Save Product"}
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Preview — always visible on desktop, toggle on mobile */}
//               {(!isMobile || showPreview) && (
//                 <div style={s.previewCol}>
//                   <PreviewPanel />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Styles ─────────────────────────────────────────────────────────────────
// const s = {
//   page:        { fontFamily:"Inter, sans-serif", padding:"0 0 40px" },
//   pageHeader:  { display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:10, marginBottom:20 },
//   pageTitle:   { fontSize:22, fontWeight:700, color:"#111827", margin:0 },
//   pageSubtitle:{ fontSize:12, color:"#6b7280", margin:"3px 0 0" },
//   addBtn:      { display:"flex", alignItems:"center", gap:5, backgroundColor:"#E8472A", color:"#fff", border:"none", borderRadius:8, padding:"9px 14px", fontSize:13, fontWeight:600, cursor:"pointer" },
//   refreshBtn:  { display:"flex", alignItems:"center", justifyContent:"center", backgroundColor:"#f9fafb", border:"1px solid #e5e7eb", borderRadius:8, padding:"9px 11px", cursor:"pointer", color:"#6b7280" },

//   errorBanner: { display:"flex", alignItems:"center", gap:8, backgroundColor:"#fee2e2", color:"#dc2626", borderRadius:8, padding:"10px 14px", marginBottom:14, fontSize:13 },
//   retryBtn:    { marginLeft:"auto", background:"none", border:"1px solid #dc2626", color:"#dc2626", borderRadius:6, padding:"4px 10px", fontSize:12, cursor:"pointer" },
//   loadingRow:  { padding:"36px 24px", textAlign:"center", color:"#9ca3af", fontSize:13 },

//   card:        { backgroundColor:"#fff", borderRadius:12, border:"1px solid #f0f0f0", overflow:"hidden" },
//   cardHeader:  { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid #f5f5f5", flexWrap:"wrap", gap:10 },
//   cardTitle:   { fontSize:15, fontWeight:700, color:"#111827", margin:0 },
//   cardSubtitle:{ fontSize:11, color:"#9ca3af", margin:"2px 0 0" },
//   searchWrap:  { display:"flex", alignItems:"center", gap:7, backgroundColor:"#f9fafb", border:"1px solid #e5e7eb", borderRadius:8, padding:"7px 11px" },
//   searchInput: { border:"none", background:"none", outline:"none", fontSize:12, color:"#374151", fontFamily:"Inter, sans-serif", width:160 },

//   tableWrap:   { overflowX:"auto" },
//   table:       { width:"100%", borderCollapse:"collapse", minWidth:500 },
//   th:          { padding:"9px 14px", textAlign:"left", fontSize:11, fontWeight:600, color:"#6b7280", backgroundColor:"#fafafa", borderBottom:"1px solid #f0f0f0", whiteSpace:"nowrap" },
//   tr:          { borderBottom:"1px solid #f9f9f9" },
//   td:          { padding:"11px 14px", fontSize:12, color:"#374151", whiteSpace:"nowrap" },
//   rowNum:      { fontWeight:600, color:"#9ca3af" },

//   productCell: { display:"flex", alignItems:"center", gap:8 },
//   productThumb:{ width:34, height:34, borderRadius:7, backgroundColor:"#f3f4f6", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", flexShrink:0 },
//   thumbImg:    { width:"100%", height:"100%", objectFit:"cover" },
//   productName: { fontWeight:500, color:"#111827", display:"block", fontSize:12 },
//   productTagline:{ fontSize:10, color:"#9ca3af", margin:"1px 0 0" },
//   price:       { fontWeight:600, color:"#111827" },
//   statusBadge: { display:"inline-block", padding:"3px 9px", borderRadius:20, fontSize:11, fontWeight:500 },
//   actions:     { display:"flex", alignItems:"center", gap:6 },
//   actionBtn:   { background:"none", border:"none", cursor:"pointer", padding:4, borderRadius:4, display:"flex", alignItems:"center" },

//   // Drawer
//   overlay:     { position:"fixed", inset:0, backgroundColor:"rgba(0,0,0,0.45)", zIndex:1000, display:"flex", alignItems:"flex-start", justifyContent:"flex-end" },
//   drawer:      { backgroundColor:"#f5f5f5", width:"min(98vw, 880px)", height:"100vh", overflowY:"auto", display:"flex", flexDirection:"column" },
//   drawerHeader:{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", backgroundColor:"#fff", borderBottom:"1px solid #f0f0f0", flexWrap:"wrap", gap:8 },
//   drawerIconWrap:{ width:32, height:32, borderRadius:7, backgroundColor:"#fff3f1", display:"flex", alignItems:"center", justifyContent:"center" },
//   drawerTitle: { fontSize:15, fontWeight:700, color:"#111827", margin:0 },
//   drawerBody:  { display:"grid", gap:14, padding:16, flex:1 },

//   formCol:     { display:"flex", flexDirection:"column", gap:14 },
//   previewCol:  { display:"flex", flexDirection:"column", gap:14 },

//   formCard:    { backgroundColor:"#fff", borderRadius:10, border:"1px solid #f0f0f0", padding:"16px" },
//   sectionLabel:{ fontSize:13, fontWeight:700, color:"#111827", margin:"0 0 2px" },
//   sectionSub:  { fontSize:11, color:"#9ca3af", margin:"0 0 12px" },

//   row2:        { display:"grid", gap:10, marginBottom:10 },
//   fieldWrap:   { display:"flex", flexDirection:"column", gap:4 },
//   label:       { fontSize:11, fontWeight:500, color:"#374151" },
//   input:       { border:"1px solid #e5e7eb", borderRadius:7, padding:"8px 11px", fontSize:12, color:"#111827", fontFamily:"Inter, sans-serif", outline:"none", width:"100%", boxSizing:"border-box", backgroundColor:"#fff" },
//   selectWrap:  { position:"relative" },
//   select:      { border:"1px solid #e5e7eb", borderRadius:7, padding:"8px 28px 8px 11px", fontSize:12, color:"#111827", fontFamily:"Inter, sans-serif", outline:"none", width:"100%", appearance:"none", backgroundColor:"#fff", cursor:"pointer" },
//   chevron:     { position:"absolute", right:9, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#6b7280" },
//   colorRow:    { display:"flex", alignItems:"center", gap:7 },
//   colorPicker: { width:34, height:34, border:"1px solid #e5e7eb", borderRadius:7, padding:2, cursor:"pointer", backgroundColor:"#fff" },

//   dropZone:    { border:"2px dashed #e5e7eb", borderRadius:9, padding:"22px 16px", textAlign:"center", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center" },
//   dropText:    { fontSize:12, color:"#6b7280", margin:0 },
//   thumbStrip:  { display:"flex", gap:8, marginTop:10, flexWrap:"wrap" },
//   thumbItem:   { position:"relative", width:52, height:52, borderRadius:7, overflow:"hidden", outline:"2px solid #E8472A" },
//   thumbRemove: { position:"absolute", top:2, right:2, backgroundColor:"rgba(0,0,0,0.55)", border:"none", borderRadius:"50%", width:15, height:15, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#fff", padding:0 },

//   formFooter:  { display:"flex", gap:8, justifyContent:"flex-end", paddingBottom:4 },
//   cancelBtn:   { backgroundColor:"#fff", border:"1px solid #e5e7eb", borderRadius:7, padding:"8px 16px", fontSize:12, fontWeight:500, color:"#374151", cursor:"pointer", fontFamily:"Inter, sans-serif" },
//   saveBtn:     { display:"flex", alignItems:"center", gap:5, backgroundColor:"#E8472A", color:"#fff", border:"none", borderRadius:7, padding:"8px 14px", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"Inter, sans-serif" },
//   closeBtn:    { background:"none", border:"none", cursor:"pointer", color:"#6b7280", padding:4, display:"flex", alignItems:"center" },

//   previewToggleBtn: { border:"none", borderRadius:7, padding:"7px 12px", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"Inter, sans-serif" },

//   // Preview panel
//   previewCard:       { backgroundColor:"#fff", borderRadius:10, border:"1px solid #f0f0f0", padding:"16px", position:"sticky", top:16 },
//   previewMain:       { width:"100%", aspectRatio:"1/1", borderRadius:9, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:8, transition:"background-color 0.3s" },
//   previewImg:        { width:"100%", height:"100%", objectFit:"cover" },
//   previewPlaceholder:{ display:"flex", flexDirection:"column", alignItems:"center" },
//   previewName:       { fontSize:14, fontWeight:700, color:"#111827", margin:"0 0 2px" },
//   previewCat:        { fontSize:11, color:"#9ca3af", margin:0 },
//   previewTag:        { display:"inline-block", marginTop:5, backgroundColor:"#fff3f1", color:"#E8472A", borderRadius:20, padding:"2px 9px", fontSize:10, fontWeight:600 },
//   previewPriceRow:   { display:"flex", alignItems:"center", gap:7, marginTop:5 },
//   previewPrice:      { fontSize:16, fontWeight:700, color:"#E8472A" },
//   previewWeight:     { fontSize:11, color:"#6b7280", backgroundColor:"#f3f4f6", borderRadius:20, padding:"2px 7px" },
// };


















import { useState, useRef, useEffect, useCallback } from "react";
import {
  Plus, Pencil, Trash2, Search, Upload,
  X, Package, ChevronDown, ImagePlus, RefreshCw, AlertCircle,
} from "lucide-react";

const BASE = import.meta.env.VITE_API_BASE ?? "http://127.0.0.1:8000";

const WEIGHTS = ["11g","51g","40g", "80g", "120g", "200g", "500g"];

const STATUS_STYLE = {
  Active:   { bg: "#dcfce7", color: "#16a34a" },
  Inactive: { bg: "#fee2e2", color: "#dc2626" },
};

const STOCK_STYLE = {
  in_stock:     { label: "In Stock",     color: "#16a34a" },
  low_stock:    { label: "Low Stock",    color: "#d97706" },
  out_of_stock: { label: "Out of Stock", color: "#dc2626" },
};

const EMPTY_FORM = {
  name: "", tagline: "", description: "",
  bg_color: "#1E5C2A", burst_light_color: "#2D7A3A", burst_dark_color: "#144020",
  rating: "4.5", reviews_count: "0", is_active: true,
  weight: "", price: "", stock_status: "in_stock", stock_quantity: "0",
  tag: "", is_default: true,
  imageFile: null, imagePreviewUrl: null,
};

const getToken = () =>
  localStorage.getItem("admin_access_token") ?? sessionStorage.getItem("access_token") ?? "";

const authHeaders = (isFormData = false) => {
  const h = { Authorization: `Bearer ${getToken()}` };
  if (!isFormData) h["Content-Type"] = "application/json";
  return h;
};

async function apiFetch(path, opts = {}) {
  const res = await fetch(`${BASE}/api${path}`, opts);
  if (!res.ok) {
    let message = `Error ${res.status}`;
    if (res.status === 413) {
      message = "File is too large. Please upload an image under 5MB.";
    } else {
      try {
        const err = await res.json();
        message = err.detail ?? message;
      } catch {
        // response wasn't JSON (e.g. plain HTML/text from nginx) — keep default message
      }
    }
    throw new Error(message);
  }
  if (res.status === 204) return null;
  return res.json();
}

function flattenProduct(p) {
  const defaultVariant = p.variants?.find((v) => v.is_default) ?? p.variants?.[0] ?? {};
  return {
    id: p.id,
    name: p.name,
    tagline: p.tagline ?? "",
    description: p.description ?? "",
    price: defaultVariant.price ? Number(defaultVariant.price) : 0,
    stock: defaultVariant.stock_quantity ?? 0,
    stock_status: defaultVariant.stock_status ?? "in_stock",
    status: p.is_active ? "Active" : "Inactive",
    image: p.image ?? null,
    bg_color: p.bg_color,
    burst_light_color: p.burst_light_color,
    burst_dark_color: p.burst_dark_color,
    rating: p.rating,
    reviews_count: p.reviews_count,
    variants: p.variants ?? [],
    defaultVariant,
  };
}

// ── Exception / success popup ───────────────────────────────────────────────
function ExceptionToast({ toast, onClose }) {
  if (!toast) return null;
  const isError = toast.type === "error";
  return (
    <div style={s.toastOverlay} onClick={onClose}>
      <div style={s.toastCard} onClick={e => e.stopPropagation()}>
        <div style={{ ...s.toastIconWrap, backgroundColor: isError ? "#fee2e2" : "#dcfce7" }}>
          <AlertCircle size={22} color={isError ? "#dc2626" : "#16a34a"} />
        </div>
        <p style={{ ...s.toastTitle, color: isError ? "#dc2626" : "#16a34a" }}>
          {isError ? "Something went wrong" : "Success"}
        </p>
        <p style={s.toastMessage}>{toast.message}</p>
        <button style={s.toastBtn} onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default function AdminProducts() {
  const [rows, setRows]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch]     = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editRow, setEditRow]   = useState(null);
  const [form, setForm]         = useState(EMPTY_FORM);
  const [weightManual, setWeightManual] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // mobile preview toggle
  const [toast, setToast]       = useState(null); // { type: "error"|"success", message: "" }
  const fileRef = useRef();

  const showToast = (type, message) => setToast({ type, message });

  // detect mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const data = await apiFetch("/admin/products/", { headers: authHeaders() });
      setRows(data.map(flattenProduct));
    } catch (e) {
      setError(e.message);
      showToast("error", e.message || "Could not load products.");
    }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const filtered = rows.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditRow(null); setForm(EMPTY_FORM); setShowForm(true); setShowPreview(false);
  };

  const openEdit = (p) => {
    const dv = p.defaultVariant;
    setEditRow(p);
    setForm({
      name: p.name, tagline: p.tagline, description: p.description,
      bg_color: p.bg_color, burst_light_color: p.burst_light_color, burst_dark_color: p.burst_dark_color,
      rating: String(p.rating), reviews_count: String(p.reviews_count),
      is_active: p.status === "Active",
      weight: dv.weight ?? "", price: dv.price ? String(dv.price) : "",
      stock_status: dv.stock_status ?? "in_stock",
      stock_quantity: String(dv.stock_quantity ?? 0),
      tag: dv.tag ?? "", is_default: dv.is_default ?? true,
      imageFile: null, imagePreviewUrl: p.image,
    });
    setShowForm(true); setShowPreview(false);
  };

  const handleFiles = (files) => {
    const file = files[0]; if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast("error", "Image is too large. Please upload a file under 5MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    setForm(prev => ({ ...prev, imageFile: file, imagePreviewUrl: url }));
  };

  const handleSave = async () => {
    if (!form.name || !form.price) {
      showToast("error", "Name and price are required.");
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      ["name","tagline","description","bg_color","burst_light_color","burst_dark_color","rating","reviews_count"].forEach(k => fd.append(k, form[k]));
      fd.append("is_active", form.is_active ? "true" : "false");
      if (form.imageFile) fd.append("image", form.imageFile);

      let product;
      if (editRow) {
        product = await apiFetch(`/admin/products/${editRow.id}/`, { method:"PATCH", headers: authHeaders(true), body: fd });
      } else {
        product = await apiFetch("/admin/products/", { method:"POST", headers: authHeaders(true), body: fd });
      }

      const variantPayload = {
        product: product.id, weight: form.weight || "80g",
        price: Number(form.price), tag: form.tag,
        stock_status: form.stock_status, stock_quantity: Number(form.stock_quantity), is_default: true,
      };

      if (editRow && editRow.defaultVariant?.id) {
        await apiFetch(`/admin/variants/${editRow.defaultVariant.id}/`, { method:"PATCH", headers: authHeaders(), body: JSON.stringify(variantPayload) });
      } else {
        await apiFetch("/admin/variants/", { method:"POST", headers: authHeaders(), body: JSON.stringify(variantPayload) });
      }

      await fetchProducts();
      setShowForm(false);
      showToast("success", editRow ? "Product updated successfully." : "Product added successfully.");
    } catch (e) {
      showToast("error", e.message || "Save failed. Please try again.");
    }
    finally { setSaving(false); }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;
    setDeleting(id);
    try {
      await apiFetch(`/admin/products/${id}/`, { method:"DELETE", headers: authHeaders() });
      setRows(prev => prev.filter(p => p.id !== id));
      showToast("success", "Product deleted successfully.");
    } catch (e) {
      showToast("error", e.message || "Delete failed. Please try again.");
    }
    finally { setDeleting(null); }
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm(prev => ({ ...prev, [key]: e.target.value })),
  });

  // ── Preview Panel ──────────────────────────────────────────────────────
  const PreviewPanel = () => (
    <div style={s.previewCard}>
      <p style={s.sectionLabel}>Preview</p>
      <p style={s.sectionSub}>How it looks in the listing.</p>
      <div style={{ ...s.previewMain, backgroundColor: form.bg_color }}>
        {form.imagePreviewUrl
          ? <img src={form.imagePreviewUrl} alt="" style={s.previewImg} />
          : <div style={s.previewPlaceholder}>
              <ImagePlus size={28} color="rgba(255,255,255,0.4)" />
              <p style={{ color:"rgba(255,255,255,0.5)", fontSize:12, marginTop:6 }}>No image yet</p>
            </div>
        }
      </div>
      <div style={{ marginTop:12 }}>
        <p style={s.previewName}>{form.name || "Product Name"}</p>
        <p style={s.previewCat}>{form.tagline || "Tagline goes here"}</p>
        {form.tag && <span style={s.previewTag}>{form.tag}</span>}
        <div style={s.previewPriceRow}>
          {form.price && <span style={s.previewPrice}>₹{form.price}</span>}
          {form.weight && <span style={s.previewWeight}>{form.weight}</span>}
        </div>
        <p style={{ fontSize:11, marginTop:4, color: STOCK_STYLE[form.stock_status]?.color ?? "#374151" }}>
          {STOCK_STYLE[form.stock_status]?.label ?? ""}
          {form.stock_quantity > 0 && ` · ${form.stock_quantity} units`}
        </p>
      </div>
    </div>
  );

  return (
    <div style={s.page}>
      {/* ── Header ── */}
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.pageTitle}>Products</h1>
          <p style={s.pageSubtitle}>Manage your product catalogue.</p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button style={s.refreshBtn} onClick={fetchProducts}><RefreshCw size={14} /></button>
          <button style={s.addBtn} onClick={openAdd}><Plus size={14} /> Add Product</button>
        </div>
      </div>

      {/* ── Error banner ── */}
      {error && (
        <div style={s.errorBanner}>
          <AlertCircle size={14} /> {error}
          <button style={s.retryBtn} onClick={fetchProducts}>Retry</button>
        </div>
      )}

      {/* ── Product list ── */}
      <div style={s.card}>
        <div style={s.cardHeader}>
          <div>
            <h2 style={s.cardTitle}>Product List</h2>
            <p style={s.cardSubtitle}>{loading ? "Loading…" : `${filtered.length} products`}</p>
          </div>
          <div style={s.searchWrap}>
            <Search size={13} color="#9ca3af" />
            <input style={s.searchInput} placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div style={s.tableWrap}>
          {loading ? (
            <div style={s.loadingRow}>Loading products…</div>
          ) : (
            <table style={s.table}>
              <thead>
                <tr>
                  {["#","Product","Price","Stock","Status","Actions"].map(h => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} style={{ ...s.td, textAlign:"center", color:"#9ca3af", padding:32 }}>
                    No products found.
                  </td></tr>
                ) : filtered.map((p, i) => (
                  <tr key={p.id} style={s.tr}>
                    <td style={s.td}><span style={s.rowNum}>{String(i+1).padStart(2,"0")}</span></td>
                    <td style={s.td}>
                      <div style={s.productCell}>
                        <div style={s.productThumb}>
                          {p.image
                            ? <img src={p.image} alt="" style={s.thumbImg} />
                            : <Package size={14} color="#9ca3af" />}
                        </div>
                        <div>
                          <span style={s.productName}>{p.name}</span>
                          {p.tagline && <p style={s.productTagline}>{p.tagline}</p>}
                        </div>
                      </div>
                    </td>
                    <td style={s.td}><span style={s.price}>₹{p.price}</span></td>
                    <td style={s.td}>
                      <span style={{ color: STOCK_STYLE[p.stock_status]?.color ?? "#374151", fontWeight:500, fontSize:11 }}>
                        {STOCK_STYLE[p.stock_status]?.label ?? p.stock_status}
                      </span>
                    </td>
                    <td style={s.td}>
                      <span style={{ ...s.statusBadge, ...STATUS_STYLE[p.status] }}>{p.status}</span>
                    </td>
                    <td style={s.td}>
                      <div style={s.actions}>
                        <button style={{ ...s.actionBtn, color:"#d97706" }} onClick={() => openEdit(p)}><Pencil size={14} /></button>
                        <button
                          style={{ ...s.actionBtn, color: deleting===p.id ? "#9ca3af" : "#dc2626" }}
                          disabled={deleting===p.id}
                          onClick={() => deleteProduct(p.id)}
                        ><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── Drawer ── */}
      {showForm && (
        <div style={s.overlay} onClick={() => setShowForm(false)}>
          <div style={s.drawer} onClick={e => e.stopPropagation()}>

            {/* Drawer header */}
            <div style={s.drawerHeader}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={s.drawerIconWrap}><Package size={16} color="#E8472A" /></div>
                <h2 style={s.drawerTitle}>{editRow ? "Edit Product" : "Add Product"}</h2>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                {/* Mobile preview toggle */}
                {isMobile && (
                  <button
                    style={{ ...s.previewToggleBtn, background: showPreview ? "#E8472A" : "#f3f4f6", color: showPreview ? "#fff" : "#374151" }}
                    onClick={() => setShowPreview(v => !v)}
                  >
                    {showPreview ? "← Form" : "Preview →"}
                  </button>
                )}
                <button
                  style={s.saveBtn}
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving…" : editRow ? "Update" : "Save"}
                </button>
                <button style={s.closeBtn} onClick={() => setShowForm(false)}><X size={16} /></button>
              </div>
            </div>

            {/* Body */}
            <div style={{ ...s.drawerBody, gridTemplateColumns: isMobile ? "1fr" : "1fr 260px" }}>

              {/* Show form or preview on mobile */}
              {(!isMobile || !showPreview) && (
                <div style={s.formCol}>

                  {/* Basic Info */}
                  <div style={s.formCard}>
                    <p style={s.sectionLabel}>Basic Information</p>

                    <div style={{ ...s.row2, gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
                      <div style={s.fieldWrap}>
                        <label style={s.label}>Product Name *</label>
                        <input style={s.input} placeholder="e.g. Himalayan Salt Makhana" {...field("name")} />
                      </div>
                      <div style={s.fieldWrap}>
                        <label style={s.label}>Tagline</label>
                        <input style={s.input} placeholder="e.g. Light. Crunchy." {...field("tagline")} />
                      </div>
                    </div>

                    <div style={{ ...s.row2, gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
                      <div style={s.fieldWrap}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <label style={s.label}>Weight</label>
                          <button
                            type="button"
                            onClick={() => setWeightManual(v => !v)}
                            style={{
                              background: "none", border: "none", cursor: "pointer",
                              fontSize: 10, fontWeight: 600, color: "#E8472A",
                              fontFamily: "Inter, sans-serif", padding: 0,
                            }}
                          >
                            {weightManual ? "Use dropdown" : "Enter manually"}
                          </button>
                        </div>

                        {weightManual ? (
                          <input
                            style={s.input}
                            placeholder="e.g. 75g"
                            {...field("weight")}
                          />
                        ) : (
                          <div style={s.selectWrap}>
                            <select style={s.select} {...field("weight")}>
                              <option value="">Select weight</option>
                              {WEIGHTS.map(w => <option key={w}>{w}</option>)}
                            </select>
                            <ChevronDown size={13} style={s.chevron} />
                          </div>
                        )}
                      </div>
                      <div style={s.fieldWrap}>
                        <label style={s.label}>Tag / Badge</label>
                        <input style={s.input} placeholder="e.g. BESTSELLER" {...field("tag")} />
                      </div>
                    </div>

                    <div style={{ ...s.row2, gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
                      <div style={s.fieldWrap}>
                        <label style={s.label}>Selling Price (₹) *</label>
                        <input style={s.input} placeholder="199" type="number" {...field("price")} />
                      </div>
                      <div style={s.fieldWrap}>
                        <label style={s.label}>Stock Quantity</label>
                        <input style={s.input} placeholder="100" type="number" {...field("stock_quantity")} />
                      </div>
                    </div>

                    <div style={{ ...s.row2, gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
                      <div style={s.fieldWrap}>
                        <label style={s.label}>Stock Status</label>
                        <div style={s.selectWrap}>
                          <select style={s.select} {...field("stock_status")}>
                            <option value="in_stock">In Stock</option>
                            <option value="low_stock">Low Stock</option>
                            <option value="out_of_stock">Out of Stock</option>
                          </select>
                          <ChevronDown size={13} style={s.chevron} />
                        </div>
                      </div>
                      <div style={s.fieldWrap}>
                        <label style={s.label}>Status</label>
                        <div style={s.selectWrap}>
                          <select
                            style={s.select}
                            value={form.is_active ? "Active" : "Inactive"}
                            onChange={e => setForm(prev => ({ ...prev, is_active: e.target.value === "Active" }))}
                          >
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                          <ChevronDown size={13} style={s.chevron} />
                        </div>
                      </div>
                    </div>

                    <div style={{ ...s.row2, gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
                      <div style={s.fieldWrap}>
                        <label style={s.label}>Rating</label>
                        <input style={s.input} placeholder="4.5" type="number" step="0.1" min="0" max="5" {...field("rating")} />
                      </div>
                      <div style={s.fieldWrap}>
                        <label style={s.label}>Reviews Count</label>
                        <input style={s.input} placeholder="0" type="number" {...field("reviews_count")} />
                      </div>
                    </div>
                  </div>

                  {/* Theme Colors */}
                  <div style={s.formCard}>
                    <p style={s.sectionLabel}>Theme Colors</p>
                    <p style={s.sectionSub}>Hero / burst ray background colors.</p>
                    <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap:10 }}>
                      {[
                        { key:"bg_color", label:"Background" },
                        { key:"burst_light_color", label:"Burst Light" },
                        { key:"burst_dark_color", label:"Burst Dark" },
                      ].map(({ key, label }) => (
                        <div key={key} style={s.fieldWrap}>
                          <label style={s.label}>{label}</label>
                          <div style={s.colorRow}>
                            <input type="color" value={form[key]}
                              onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                              style={s.colorPicker} />
                            <input style={{ ...s.input, flex:1 }} {...field(key)} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div style={s.formCard}>
                    <p style={s.sectionLabel}>Description</p>
                    <textarea
                      style={{ ...s.input, height:80, resize:"vertical" }}
                      placeholder="Describe the product…"
                      {...field("description")}
                    />
                  </div>

                  {/* Image Upload */}
                  <div style={s.formCard}>
                    <p style={s.sectionLabel}>Product Image</p>
                    <p style={s.sectionSub}>PNG, JPG up to 5MB.</p>
                    <div
                      style={s.dropZone}
                      onClick={() => fileRef.current.click()}
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
                    >
                      <Upload size={22} color="#9ca3af" style={{ marginBottom:6 }} />
                      <p style={s.dropText}>Click to upload or drag & drop</p>
                      <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }}
                        onChange={e => handleFiles(e.target.files)} />
                    </div>
                    {form.imagePreviewUrl && (
                      <div style={s.thumbStrip}>
                        <div style={s.thumbItem}>
                          <img src={form.imagePreviewUrl} alt="" style={s.thumbImg} />
                          <button style={s.thumbRemove}
                            onClick={() => setForm(prev => ({ ...prev, imageFile:null, imagePreviewUrl:null }))}>
                            <X size={10} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div style={s.formFooter}>
                    <button style={s.cancelBtn} onClick={() => setShowForm(false)} disabled={saving}>Cancel</button>
                    <button style={{ ...s.saveBtn, opacity: saving ? 0.7 : 1 }} onClick={handleSave} disabled={saving}>
                      {saving ? "Saving…" : editRow ? "Update Product" : "Save Product"}
                    </button>
                  </div>
                </div>
              )}

              {/* Preview — always visible on desktop, toggle on mobile */}
              {(!isMobile || showPreview) && (
                <div style={s.previewCol}>
                  <PreviewPanel />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Exception / success popup ── */}
      <ExceptionToast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────
const s = {
  page:        { fontFamily:"Inter, sans-serif", padding:"0 0 40px" },
  pageHeader:  { display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:10, marginBottom:20 },
  pageTitle:   { fontSize:22, fontWeight:700, color:"#111827", margin:0 },
  pageSubtitle:{ fontSize:12, color:"#6b7280", margin:"3px 0 0" },
  addBtn:      { display:"flex", alignItems:"center", gap:5, backgroundColor:"#E8472A", color:"#fff", border:"none", borderRadius:8, padding:"9px 14px", fontSize:13, fontWeight:600, cursor:"pointer" },
  refreshBtn:  { display:"flex", alignItems:"center", justifyContent:"center", backgroundColor:"#f9fafb", border:"1px solid #e5e7eb", borderRadius:8, padding:"9px 11px", cursor:"pointer", color:"#6b7280" },

  errorBanner: { display:"flex", alignItems:"center", gap:8, backgroundColor:"#fee2e2", color:"#dc2626", borderRadius:8, padding:"10px 14px", marginBottom:14, fontSize:13 },
  retryBtn:    { marginLeft:"auto", background:"none", border:"1px solid #dc2626", color:"#dc2626", borderRadius:6, padding:"4px 10px", fontSize:12, cursor:"pointer" },
  loadingRow:  { padding:"36px 24px", textAlign:"center", color:"#9ca3af", fontSize:13 },

  card:        { backgroundColor:"#fff", borderRadius:12, border:"1px solid #f0f0f0", overflow:"hidden" },
  cardHeader:  { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid #f5f5f5", flexWrap:"wrap", gap:10 },
  cardTitle:   { fontSize:15, fontWeight:700, color:"#111827", margin:0 },
  cardSubtitle:{ fontSize:11, color:"#9ca3af", margin:"2px 0 0" },
  searchWrap:  { display:"flex", alignItems:"center", gap:7, backgroundColor:"#f9fafb", border:"1px solid #e5e7eb", borderRadius:8, padding:"7px 11px" },
  searchInput: { border:"none", background:"none", outline:"none", fontSize:12, color:"#374151", fontFamily:"Inter, sans-serif", width:160 },

  tableWrap:   { overflowX:"auto" },
  table:       { width:"100%", borderCollapse:"collapse", minWidth:500 },
  th:          { padding:"9px 14px", textAlign:"left", fontSize:11, fontWeight:600, color:"#6b7280", backgroundColor:"#fafafa", borderBottom:"1px solid #f0f0f0", whiteSpace:"nowrap" },
  tr:          { borderBottom:"1px solid #f9f9f9" },
  td:          { padding:"11px 14px", fontSize:12, color:"#374151", whiteSpace:"nowrap" },
  rowNum:      { fontWeight:600, color:"#9ca3af" },

  productCell: { display:"flex", alignItems:"center", gap:8 },
  productThumb:{ width:34, height:34, borderRadius:7, backgroundColor:"#f3f4f6", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", flexShrink:0 },
  thumbImg:    { width:"100%", height:"100%", objectFit:"cover" },
  productName: { fontWeight:500, color:"#111827", display:"block", fontSize:12 },
  productTagline:{ fontSize:10, color:"#9ca3af", margin:"1px 0 0" },
  price:       { fontWeight:600, color:"#111827" },
  statusBadge: { display:"inline-block", padding:"3px 9px", borderRadius:20, fontSize:11, fontWeight:500 },
  actions:     { display:"flex", alignItems:"center", gap:6 },
  actionBtn:   { background:"none", border:"none", cursor:"pointer", padding:4, borderRadius:4, display:"flex", alignItems:"center" },

  // Drawer
  overlay:     { position:"fixed", inset:0, backgroundColor:"rgba(0,0,0,0.45)", zIndex:1000, display:"flex", alignItems:"flex-start", justifyContent:"flex-end" },
  drawer:      { backgroundColor:"#f5f5f5", width:"min(98vw, 880px)", height:"100vh", overflowY:"auto", display:"flex", flexDirection:"column" },
  drawerHeader:{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", backgroundColor:"#fff", borderBottom:"1px solid #f0f0f0", flexWrap:"wrap", gap:8 },
  drawerIconWrap:{ width:32, height:32, borderRadius:7, backgroundColor:"#fff3f1", display:"flex", alignItems:"center", justifyContent:"center" },
  drawerTitle: { fontSize:15, fontWeight:700, color:"#111827", margin:0 },
  drawerBody:  { display:"grid", gap:14, padding:16, flex:1 },

  formCol:     { display:"flex", flexDirection:"column", gap:14 },
  previewCol:  { display:"flex", flexDirection:"column", gap:14 },

  formCard:    { backgroundColor:"#fff", borderRadius:10, border:"1px solid #f0f0f0", padding:"16px" },
  sectionLabel:{ fontSize:13, fontWeight:700, color:"#111827", margin:"0 0 2px" },
  sectionSub:  { fontSize:11, color:"#9ca3af", margin:"0 0 12px" },

  row2:        { display:"grid", gap:10, marginBottom:10 },
  fieldWrap:   { display:"flex", flexDirection:"column", gap:4 },
  label:       { fontSize:11, fontWeight:500, color:"#374151" },
  input:       { border:"1px solid #e5e7eb", borderRadius:7, padding:"8px 11px", fontSize:12, color:"#111827", fontFamily:"Inter, sans-serif", outline:"none", width:"100%", boxSizing:"border-box", backgroundColor:"#fff" },
  selectWrap:  { position:"relative" },
  select:      { border:"1px solid #e5e7eb", borderRadius:7, padding:"8px 28px 8px 11px", fontSize:12, color:"#111827", fontFamily:"Inter, sans-serif", outline:"none", width:"100%", appearance:"none", backgroundColor:"#fff", cursor:"pointer" },
  chevron:     { position:"absolute", right:9, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#6b7280" },
  colorRow:    { display:"flex", alignItems:"center", gap:7 },
  colorPicker: { width:34, height:34, border:"1px solid #e5e7eb", borderRadius:7, padding:2, cursor:"pointer", backgroundColor:"#fff" },

  dropZone:    { border:"2px dashed #e5e7eb", borderRadius:9, padding:"22px 16px", textAlign:"center", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center" },
  dropText:    { fontSize:12, color:"#6b7280", margin:0 },
  thumbStrip:  { display:"flex", gap:8, marginTop:10, flexWrap:"wrap" },
  thumbItem:   { position:"relative", width:52, height:52, borderRadius:7, overflow:"hidden", outline:"2px solid #E8472A" },
  thumbRemove: { position:"absolute", top:2, right:2, backgroundColor:"rgba(0,0,0,0.55)", border:"none", borderRadius:"50%", width:15, height:15, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#fff", padding:0 },

  formFooter:  { display:"flex", gap:8, justifyContent:"flex-end", paddingBottom:4 },
  cancelBtn:   { backgroundColor:"#fff", border:"1px solid #e5e7eb", borderRadius:7, padding:"8px 16px", fontSize:12, fontWeight:500, color:"#374151", cursor:"pointer", fontFamily:"Inter, sans-serif" },
  saveBtn:     { display:"flex", alignItems:"center", gap:5, backgroundColor:"#E8472A", color:"#fff", border:"none", borderRadius:7, padding:"8px 14px", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"Inter, sans-serif" },
  closeBtn:    { background:"none", border:"none", cursor:"pointer", color:"#6b7280", padding:4, display:"flex", alignItems:"center" },

  previewToggleBtn: { border:"none", borderRadius:7, padding:"7px 12px", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"Inter, sans-serif" },

  // Preview panel
  previewCard:       { backgroundColor:"#fff", borderRadius:10, border:"1px solid #f0f0f0", padding:"16px", position:"sticky", top:16 },
  previewMain:       { width:"100%", aspectRatio:"1/1", borderRadius:9, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:8, transition:"background-color 0.3s" },
  previewImg:        { width:"100%", height:"100%", objectFit:"cover" },
  previewPlaceholder:{ display:"flex", flexDirection:"column", alignItems:"center" },
  previewName:       { fontSize:14, fontWeight:700, color:"#111827", margin:"0 0 2px" },
  previewCat:        { fontSize:11, color:"#9ca3af", margin:0 },
  previewTag:        { display:"inline-block", marginTop:5, backgroundColor:"#fff3f1", color:"#E8472A", borderRadius:20, padding:"2px 9px", fontSize:10, fontWeight:600 },
  previewPriceRow:   { display:"flex", alignItems:"center", gap:7, marginTop:5 },
  previewPrice:      { fontSize:16, fontWeight:700, color:"#E8472A" },
  previewWeight:     { fontSize:11, color:"#6b7280", backgroundColor:"#f3f4f6", borderRadius:20, padding:"2px 7px" },

  // Exception toast popup
  toastOverlay: { position:"fixed", inset:0, backgroundColor:"rgba(0,0,0,0.45)", zIndex:2000, display:"flex", alignItems:"center", justifyContent:"center", padding:20 },
  toastCard:    { backgroundColor:"#fff", borderRadius:14, padding:"28px 24px", maxWidth:340, width:"100%", textAlign:"center", boxShadow:"0 20px 60px rgba(0,0,0,0.25)" },
  toastIconWrap:{ width:48, height:48, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" },
  toastTitle:   { fontSize:15, fontWeight:700, margin:"0 0 6px" },
  toastMessage: { fontSize:13, color:"#6b7280", margin:"0 0 18px", lineHeight:1.5 },
  toastBtn:     { backgroundColor:"#E8472A", color:"#fff", border:"none", borderRadius:8, padding:"10px 28px", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"Inter, sans-serif" },
};