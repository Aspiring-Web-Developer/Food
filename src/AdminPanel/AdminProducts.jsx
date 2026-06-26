// import { useState, useRef } from "react";
// import {
//   Plus, Pencil, Trash2, Eye, Search, Upload,
//   X, Package, Tag, IndianRupee, Layers,
//   ChevronDown, ImagePlus,
// } from "lucide-react";

// // ── Sample product data ───────────────────────────────────────
// const SAMPLE_PRODUCTS = [
//   { id: 1, name: "Himalayan Pink Salt Makhana",  category: "Makhana", price: 199, stock: 120, status: "Active",   image: null },
//   { id: 2, name: "Peri Peri Makhana",            category: "Makhana", price: 219, stock: 85,  status: "Active",   image: null },
//   { id: 3, name: "Classic Salted Makhana",        category: "Makhana", price: 179, stock: 0,   status: "Inactive", image: null },
//   { id: 4, name: "Dark Chocolate Makhana",        category: "Makhana", price: 249, stock: 45,  status: "Active",   image: null },
//   { id: 5, name: "Cream & Onion Makhana",         category: "Makhana", price: 199, stock: 200, status: "Active",   image: null },
//   { id: 6, name: "Tandoori Twist Makhana",        category: "Makhana", price: 229, stock: 0,   status: "Inactive", image: null },
// ];

// const CATEGORIES = ["Makhana", "Dry Fruits", "Seeds", "Combo Pack", "Gift Box"];
// const FLAVORS    = ["Plain", "Salted", "Spicy", "Sweet", "Tangy", "Smoky"];

// const STATUS_STYLE = {
//   Active:   { bg: "#dcfce7", color: "#16a34a" },
//   Inactive: { bg: "#fee2e2", color: "#dc2626" },
// };

// const EMPTY_FORM = {
//   name: "", category: "", flavor: "", price: "",
//   mrp: "", stock: "", weight: "", description: "",
//   images: [], status: "Active",
// };

// // ── Component ────────────────────────────────────────────────
// export default function AdminProducts() {
//   const [products, setProducts]   = useState(SAMPLE_PRODUCTS);
//   const [search, setSearch]       = useState("");
//   const [showForm, setShowForm]   = useState(false);
//   const [editProduct, setEdit]    = useState(null);   // null = add new
//   const [form, setForm]           = useState(EMPTY_FORM);
//   const [previewIdx, setPreview]  = useState(0);
//   const fileRef                   = useRef();

//   // filtered list
//   const filtered = products.filter(
//     (p) =>
//       p.name.toLowerCase().includes(search.toLowerCase()) ||
//       p.category.toLowerCase().includes(search.toLowerCase())
//   );

//   // open add form
//   const openAdd = () => {
//     setEdit(null);
//     setForm(EMPTY_FORM);
//     setPreview(0);
//     setShowForm(true);
//   };

//   // open edit form
//   const openEdit = (p) => {
//     setEdit(p);
//     setForm({
//       name: p.name, category: p.category, flavor: p.flavor || "",
//       price: p.price, mrp: p.mrp || "", stock: p.stock,
//       weight: p.weight || "", description: p.description || "",
//       images: p.images || [], status: p.status,
//     });
//     setPreview(0);
//     setShowForm(true);
//   };

//   // handle file pick
//   const handleFiles = (files) => {
//     const urls = Array.from(files).map((f) => URL.createObjectURL(f));
//     setForm((prev) => ({ ...prev, images: [...prev.images, ...urls].slice(0, 5) }));
//   };

//   // save
//   const handleSave = () => {
//     if (!form.name || !form.price) return alert("Name and price are required.");
//     if (editProduct) {
//       setProducts((prev) =>
//         prev.map((p) =>
//           p.id === editProduct.id
//             ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) }
//             : p
//         )
//       );
//     } else {
//       setProducts((prev) => [
//         ...prev,
//         { id: Date.now(), ...form, price: Number(form.price), stock: Number(form.stock) },
//       ]);
//     }
//     setShowForm(false);
//   };

//   const deleteProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

//   const field = (key) => ({
//     value: form[key],
//     onChange: (e) => setForm((prev) => ({ ...prev, [key]: e.target.value })),
//   });

//   return (
//     <div style={s.page}>
//       {/* ── Header ── */}
//       <div style={s.pageHeader}>
//         <div>
//           <h1 style={s.pageTitle}>Products</h1>
//           <p style={s.pageSubtitle}>Manage your product catalogue — add, edit, or remove items.</p>
//         </div>
//         <button style={s.addBtn} onClick={openAdd}>
//           <Plus size={15} /> Add Product
//         </button>
//       </div>

//       {/* ── Product list card ── */}
//       <div style={s.card}>
//         <div style={s.cardHeader}>
//           <div>
//             <h2 style={s.cardTitle}>Product List</h2>
//             <p style={s.cardSubtitle}>{filtered.length} products</p>
//           </div>
//           <div style={s.searchWrap}>
//             <Search size={14} color="#9ca3af" />
//             <input
//               style={s.searchInput}
//               placeholder="Search products…"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         <div style={s.tableWrap}>
//           <table style={s.table}>
//             <thead>
//               <tr>
//                 {["#", "Product", "Category", "Price", "Stock", "Status", "Action"].map((h) => (
//                   <th key={h} style={s.th}>{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((p, i) => (
//                 <tr key={p.id} style={s.tr}>
//                   <td style={s.td}><span style={s.rowNum}>{String(i + 1).padStart(2, "0")}</span></td>
//                   <td style={s.td}>
//                     <div style={s.productCell}>
//                       <div style={s.productThumb}>
//                         {p.images?.[0]
//                           ? <img src={p.images[0]} alt="" style={s.thumbImg} />
//                           : <Package size={16} color="#9ca3af" />}
//                       </div>
//                       <span style={s.productName}>{p.name}</span>
//                     </div>
//                   </td>
//                   <td style={s.td}><span style={s.catBadge}>{p.category}</span></td>
//                   <td style={s.td}><span style={s.price}>₹{p.price}</span></td>
//                   <td style={s.td}>
//                     <span style={{ color: p.stock === 0 ? "#dc2626" : "#374151", fontWeight: p.stock === 0 ? 600 : 400 }}>
//                       {p.stock === 0 ? "Out of stock" : p.stock}
//                     </span>
//                   </td>
//                   <td style={s.td}>
//                     <span style={{ ...s.statusBadge, ...STATUS_STYLE[p.status] }}>{p.status}</span>
//                   </td>
//                   <td style={s.td}>
//                     <div style={s.actions}>
//                       <button style={{ ...s.actionBtn, color: "#16a34a" }} title="View"><Eye size={15} /></button>
//                       <button style={{ ...s.actionBtn, color: "#d97706" }} title="Edit" onClick={() => openEdit(p)}><Pencil size={15} /></button>
//                       <button style={{ ...s.actionBtn, color: "#dc2626" }} title="Delete" onClick={() => deleteProduct(p.id)}><Trash2 size={15} /></button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ── Add / Edit product drawer ── */}
//       {showForm && (
//         <div style={s.overlay} onClick={() => setShowForm(false)}>
//           <div style={s.drawer} onClick={(e) => e.stopPropagation()}>

//             {/* Drawer header */}
//             <div style={s.drawerHeader}>
//               <div style={s.drawerTitleRow}>
//                 <div style={s.drawerIconWrap}><Package size={18} color="#E8472A" /></div>
//                 <h2 style={s.drawerTitle}>{editProduct ? "Edit Product" : "Add New Product"}</h2>
//               </div>
//               <div style={s.drawerActions}>
//                 <button style={s.saveDraftBtn} onClick={() => setShowForm(false)}>Save Draft</button>
//                 <button style={s.saveBtn} onClick={handleSave}>
//                   <Plus size={14} /> {editProduct ? "Update Product" : "Add Product"}
//                 </button>
//                 <button style={s.closeBtn} onClick={() => setShowForm(false)}><X size={18} /></button>
//               </div>
//             </div>

//             {/* Two-column body */}
//             <div style={s.drawerBody}>

//               {/* LEFT — form */}
//               <div style={s.formCol}>

//                 {/* Section: Basic Info */}
//                 <div style={s.formCard}>
//                   <p style={s.sectionLabel}>Basic Information</p>
//                   <p style={s.sectionSub}>Name, category and pricing details.</p>

//                   <div style={s.row2}>
//                     <div style={s.fieldWrap}>
//                       <label style={s.label}>Product Name</label>
//                       <input style={s.input} placeholder="e.g. Himalayan Pink Salt Makhana" {...field("name")} />
//                     </div>
//                     <div style={s.fieldWrap}>
//                       <label style={s.label}>Category</label>
//                       <div style={s.selectWrap}>
//                         <select style={s.select} {...field("category")}>
//                           <option value="">Select category</option>
//                           {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
//                         </select>
//                         <ChevronDown size={14} style={s.chevron} />
//                       </div>
//                     </div>
//                   </div>

//                   <div style={s.row2}>
//                     <div style={s.fieldWrap}>
//                       <label style={s.label}>Flavor</label>
//                       <div style={s.selectWrap}>
//                         <select style={s.select} {...field("flavor")}>
//                           <option value="">Select flavor</option>
//                           {FLAVORS.map((f) => <option key={f}>{f}</option>)}
//                         </select>
//                         <ChevronDown size={14} style={s.chevron} />
//                       </div>
//                     </div>
//                     <div style={s.fieldWrap}>
//                       <label style={s.label}>Weight (g)</label>
//                       <input style={s.input} placeholder="e.g. 80" type="number" {...field("weight")} />
//                     </div>
//                   </div>

//                   <div style={s.row2}>
//                     <div style={s.fieldWrap}>
//                       <label style={s.label}>Selling Price (₹)</label>
//                       <input style={s.input} placeholder="e.g. 199" type="number" {...field("price")} />
//                     </div>
//                     <div style={s.fieldWrap}>
//                       <label style={s.label}>MRP (₹)</label>
//                       <input style={s.input} placeholder="e.g. 249" type="number" {...field("mrp")} />
//                     </div>
//                   </div>

//                   <div style={s.row2}>
//                     <div style={s.fieldWrap}>
//                       <label style={s.label}>Stock Quantity</label>
//                       <input style={s.input} placeholder="e.g. 100" type="number" {...field("stock")} />
//                     </div>
//                     <div style={s.fieldWrap}>
//                       <label style={s.label}>Status</label>
//                       <div style={s.selectWrap}>
//                         <select style={s.select} {...field("status")}>
//                           <option>Active</option>
//                           <option>Inactive</option>
//                         </select>
//                         <ChevronDown size={14} style={s.chevron} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Section: Description */}
//                 <div style={s.formCard}>
//                   <p style={s.sectionLabel}>Description</p>
//                   <p style={s.sectionSub}>Short product description shown on listing.</p>
//                   <textarea
//                     style={{ ...s.input, height: 90, resize: "vertical" }}
//                     placeholder="Describe the product…"
//                     {...field("description")}
//                   />
//                 </div>

//                 {/* Section: Upload */}
//                 <div style={s.formCard}>
//                   <p style={s.sectionLabel}>Product Images</p>
//                   <p style={s.sectionSub}>Upload up to 5 images. First image is the thumbnail.</p>

//                   {/* Drop zone */}
//                   <div
//                     style={s.dropZone}
//                     onClick={() => fileRef.current.click()}
//                     onDragOver={(e) => e.preventDefault()}
//                     onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
//                   >
//                     <Upload size={28} color="#9ca3af" style={{ marginBottom: 8 }} />
//                     <p style={s.dropText}>Upload your images, or <span style={s.browseLink}>browse</span></p>
//                     <p style={s.dropHint}>PNG, JPG up to 5MB</p>
//                     <input
//                       ref={fileRef} type="file" multiple accept="image/*"
//                       style={{ display: "none" }}
//                       onChange={(e) => handleFiles(e.target.files)}
//                     />
//                   </div>

//                   {/* Thumbnail strip */}
//                   {form.images.length > 0 && (
//                     <div style={s.thumbStrip}>
//                       {form.images.map((src, i) => (
//                         <div key={i} style={{ ...s.thumbItem, outline: i === previewIdx ? "2px solid #E8472A" : "none" }}>
//                           <img src={src} alt="" style={s.thumbImg} onClick={() => setPreview(i)} />
//                           <button
//                             style={s.thumbRemove}
//                             onClick={() => setForm((prev) => ({
//                               ...prev,
//                               images: prev.images.filter((_, j) => j !== i),
//                             }))}
//                           ><X size={10} /></button>
//                         </div>
//                       ))}
//                       {form.images.length < 5 && (
//                         <button style={s.thumbAdd} onClick={() => fileRef.current.click()}>
//                           <Plus size={16} color="#9ca3af" />
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 <div style={s.formFooter}>
//                   <button style={s.cancelBtn} onClick={() => setShowForm(false)}>Cancel</button>
//                   <button style={s.saveBtn} onClick={handleSave}>
//                     {editProduct ? "Update Product" : "Save Changes"}
//                   </button>
//                 </div>
//               </div>

//               {/* RIGHT — live preview */}
//               <div style={s.previewCol}>
//                 <div style={s.previewCard}>
//                   <p style={s.sectionLabel}>Preview</p>
//                   <p style={s.sectionSub}>How the product will look in the listing.</p>

//                   {/* Main image */}
//                   <div style={s.previewMain}>
//                     {form.images[previewIdx]
//                       ? <img src={form.images[previewIdx]} alt="" style={s.previewImg} />
//                       : (
//                         <div style={s.previewPlaceholder}>
//                           <ImagePlus size={36} color="#d1d5db" />
//                           <p style={{ color: "#d1d5db", fontSize: 13, marginTop: 8 }}>No image yet</p>
//                         </div>
//                       )
//                     }
//                   </div>

//                   {/* Thumb strip (preview) */}
//                   {form.images.length > 0 && (
//                     <div style={s.previewStrip}>
//                       {form.images.map((src, i) => (
//                         <div
//                           key={i}
//                           style={{ ...s.previewThumb, outline: i === previewIdx ? "2px solid #E8472A" : "none" }}
//                           onClick={() => setPreview(i)}
//                         >
//                           <img src={src} alt="" style={s.thumbImg} />
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {/* Product info preview */}
//                   <div style={{ marginTop: 16 }}>
//                     <p style={s.previewName}>{form.name || "Product Name"}</p>
//                     <p style={s.previewCat}>{form.category || "Category"}{form.flavor ? ` · ${form.flavor}` : ""}</p>
//                     <div style={s.previewPriceRow}>
//                       {form.price && <span style={s.previewPrice}>₹{form.price}</span>}
//                       {form.mrp && <span style={s.previewMrp}>₹{form.mrp}</span>}
//                     </div>
//                     {form.stock !== "" && (
//                       <p style={{ fontSize: 12, color: Number(form.stock) === 0 ? "#dc2626" : "#16a34a", marginTop: 6 }}>
//                         {Number(form.stock) === 0 ? "Out of stock" : `${form.stock} units in stock`}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Styles ───────────────────────────────────────────────────
// const s = {
//   page: { fontFamily: "Inter, sans-serif" },
//   pageHeader: {
//     display: "flex", alignItems: "flex-start", justifyContent: "space-between",
//     flexWrap: "wrap", gap: 12, marginBottom: 24,
//   },
//   pageTitle:    { fontSize: 26, fontWeight: 700, color: "#111827", margin: 0 },
//   pageSubtitle: { fontSize: 13, color: "#6b7280", margin: "4px 0 0" },
//   addBtn: {
//     display: "flex", alignItems: "center", gap: 6,
//     backgroundColor: "#E8472A", color: "#fff", border: "none",
//     borderRadius: 8, padding: "10px 18px", fontSize: 13,
//     fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif",
//   },

//   card: {
//     backgroundColor: "#fff", borderRadius: 14,
//     border: "1px solid #f0f0f0", overflow: "hidden",
//   },
//   cardHeader: {
//     display: "flex", alignItems: "center", justifyContent: "space-between",
//     padding: "20px 24px 16px", borderBottom: "1px solid #f5f5f5",
//     flexWrap: "wrap", gap: 12,
//   },
//   cardTitle:    { fontSize: 16, fontWeight: 700, color: "#111827", margin: 0 },
//   cardSubtitle: { fontSize: 12, color: "#9ca3af", margin: "2px 0 0" },
//   searchWrap: {
//     display: "flex", alignItems: "center", gap: 8,
//     backgroundColor: "#f9fafb", border: "1px solid #e5e7eb",
//     borderRadius: 8, padding: "8px 12px",
//   },
//   searchInput: {
//     border: "none", background: "none", outline: "none",
//     fontSize: 13, color: "#374151", fontFamily: "Inter, sans-serif", width: 200,
//   },

//   tableWrap: { overflowX: "auto" },
//   table: { width: "100%", borderCollapse: "collapse", minWidth: 640 },
//   th: {
//     padding: "10px 16px", textAlign: "left", fontSize: 12,
//     fontWeight: 600, color: "#6b7280", backgroundColor: "#fafafa",
//     borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap",
//   },
//   tr: { borderBottom: "1px solid #f9f9f9" },
//   td: { padding: "13px 16px", fontSize: 13, color: "#374151", whiteSpace: "nowrap" },
//   rowNum: { fontWeight: 600, color: "#9ca3af" },

//   productCell: { display: "flex", alignItems: "center", gap: 10 },
//   productThumb: {
//     width: 38, height: 38, borderRadius: 8,
//     backgroundColor: "#f3f4f6", display: "flex",
//     alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0,
//   },
//   thumbImg:    { width: "100%", height: "100%", objectFit: "cover" },
//   productName: { fontWeight: 500, color: "#111827" },
//   catBadge: {
//     backgroundColor: "#f3f4f6", color: "#374151",
//     borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 500,
//   },
//   price:       { fontWeight: 600, color: "#111827" },
//   statusBadge: { display: "inline-block", padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500 },
//   actions:     { display: "flex", alignItems: "center", gap: 8 },
//   actionBtn:   {
//     background: "none", border: "none", cursor: "pointer",
//     padding: 4, borderRadius: 4, display: "flex", alignItems: "center",
//   },

//   // ── Drawer ──
//   overlay: {
//     position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)",
//     zIndex: 1000, display: "flex", alignItems: "flex-start", justifyContent: "flex-end",
//   },
//   drawer: {
//     backgroundColor: "#f5f5f5", width: "min(96vw, 960px)", height: "100vh",
//     overflowY: "auto", display: "flex", flexDirection: "column",
//   },
//   drawerHeader: {
//     display: "flex", alignItems: "center", justifyContent: "space-between",
//     padding: "18px 24px", backgroundColor: "#fff",
//     borderBottom: "1px solid #f0f0f0", flexWrap: "wrap", gap: 10,
//   },
//   drawerTitleRow: { display: "flex", alignItems: "center", gap: 10 },
//   drawerIconWrap: {
//     width: 36, height: 36, borderRadius: 8,
//     backgroundColor: "#fff3f1", display: "flex", alignItems: "center", justifyContent: "center",
//   },
//   drawerTitle: { fontSize: 16, fontWeight: 700, color: "#111827", margin: 0 },
//   drawerActions: { display: "flex", alignItems: "center", gap: 10 },
//   saveDraftBtn: {
//     backgroundColor: "#fff", border: "1px solid #e5e7eb",
//     borderRadius: 8, padding: "8px 14px", fontSize: 13,
//     fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: "Inter, sans-serif",
//   },
//   saveBtn: {
//     display: "flex", alignItems: "center", gap: 6,
//     backgroundColor: "#E8472A", color: "#fff", border: "none",
//     borderRadius: 8, padding: "8px 16px", fontSize: 13,
//     fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif",
//   },
//   closeBtn: {
//     background: "none", border: "none", cursor: "pointer",
//     color: "#6b7280", padding: 4, display: "flex", alignItems: "center",
//   },

//   drawerBody: {
//     display: "grid",
//     gridTemplateColumns: "1fr 320px",
//     gap: 16, padding: 20, flex: 1,
//   },
//   formCol:    { display: "flex", flexDirection: "column", gap: 16 },
//   previewCol: { display: "flex", flexDirection: "column", gap: 16 },

//   formCard: {
//     backgroundColor: "#fff", borderRadius: 12,
//     border: "1px solid #f0f0f0", padding: "20px 20px 16px",
//   },
//   sectionLabel: { fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 2px" },
//   sectionSub:   { fontSize: 12, color: "#9ca3af", margin: "0 0 16px" },

//   row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 },
//   fieldWrap: { display: "flex", flexDirection: "column", gap: 5 },
//   label: { fontSize: 12, fontWeight: 500, color: "#374151" },
//   input: {
//     border: "1px solid #e5e7eb", borderRadius: 8,
//     padding: "9px 12px", fontSize: 13, color: "#111827",
//     fontFamily: "Inter, sans-serif", outline: "none", width: "100%",
//     boxSizing: "border-box", backgroundColor: "#fff",
//   },
//   selectWrap: { position: "relative" },
//   select: {
//     border: "1px solid #e5e7eb", borderRadius: 8,
//     padding: "9px 32px 9px 12px", fontSize: 13, color: "#111827",
//     fontFamily: "Inter, sans-serif", outline: "none", width: "100%",
//     appearance: "none", backgroundColor: "#fff", cursor: "pointer",
//   },
//   chevron: { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6b7280" },

//   dropZone: {
//     border: "2px dashed #e5e7eb", borderRadius: 10,
//     padding: "28px 20px", textAlign: "center",
//     cursor: "pointer", transition: "border-color 0.2s",
//     display: "flex", flexDirection: "column", alignItems: "center",
//   },
//   dropText:   { fontSize: 13, color: "#374151", margin: 0 },
//   dropHint:   { fontSize: 12, color: "#9ca3af", marginTop: 4 },
//   browseLink: { color: "#E8472A", fontWeight: 500, textDecoration: "underline", cursor: "pointer" },

//   thumbStrip:  { display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" },
//   thumbItem:   { position: "relative", width: 56, height: 56, borderRadius: 8, overflow: "hidden", cursor: "pointer" },
//   thumbRemove: {
//     position: "absolute", top: 2, right: 2,
//     backgroundColor: "rgba(0,0,0,0.55)", border: "none",
//     borderRadius: "50%", width: 16, height: 16,
//     display: "flex", alignItems: "center", justifyContent: "center",
//     cursor: "pointer", color: "#fff", padding: 0,
//   },
//   thumbAdd: {
//     width: 56, height: 56, borderRadius: 8,
//     border: "2px dashed #e5e7eb", backgroundColor: "#fafafa",
//     display: "flex", alignItems: "center", justifyContent: "center",
//     cursor: "pointer",
//   },

//   formFooter: {
//     display: "flex", gap: 10, justifyContent: "flex-end", paddingBottom: 4,
//   },
//   cancelBtn: {
//     backgroundColor: "#fff", border: "1px solid #e5e7eb",
//     borderRadius: 8, padding: "10px 20px", fontSize: 13,
//     fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: "Inter, sans-serif",
//   },

//   // Preview panel
//   previewCard: {
//     backgroundColor: "#fff", borderRadius: 12,
//     border: "1px solid #f0f0f0", padding: "20px",
//     position: "sticky", top: 16,
//   },
//   previewMain: {
//     width: "100%", aspectRatio: "1 / 1", borderRadius: 10,
//     backgroundColor: "#f3f4f6", overflow: "hidden",
//     display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10,
//   },
//   previewImg:         { width: "100%", height: "100%", objectFit: "cover" },
//   previewPlaceholder: { display: "flex", flexDirection: "column", alignItems: "center" },
//   previewStrip: { display: "flex", gap: 8, flexWrap: "wrap" },
//   previewThumb: {
//     width: 48, height: 48, borderRadius: 8,
//     overflow: "hidden", cursor: "pointer",
//   },
//   previewName:     { fontSize: 15, fontWeight: 700, color: "#111827", margin: "0 0 2px" },
//   previewCat:      { fontSize: 12, color: "#9ca3af", margin: 0 },
//   previewPriceRow: { display: "flex", alignItems: "center", gap: 8, marginTop: 6 },
//   previewPrice:    { fontSize: 18, fontWeight: 700, color: "#E8472A" },
//   previewMrp:      { fontSize: 13, color: "#9ca3af", textDecoration: "line-through" },
// };




import { useState, useRef, useEffect, useCallback } from "react";
import {
  Plus, Pencil, Trash2, Eye, Search, Upload,
  X, Package, Tag, IndianRupee, Layers,
  ChevronDown, ImagePlus, RefreshCw, AlertCircle,
} from "lucide-react";

const BASE = import.meta.env.VITE_API_BASE ?? "http://127.0.0.1:8000";

const CATEGORIES = ["Makhana", "Dry Fruits", "Seeds", "Combo Pack", "Gift Box"];
const FLAVORS    = ["Plain", "Salted", "Spicy", "Sweet", "Tangy", "Smoky"];
const WEIGHTS    = ["40g", "80g", "120g", "200g", "500g"];

const STATUS_STYLE = {
  Active:   { bg: "#dcfce7", color: "#16a34a" },
  Inactive: { bg: "#fee2e2", color: "#dc2626" },
};

const STOCK_STYLE = {
  in_stock:      { label: "In Stock",     color: "#16a34a" },
  low_stock:     { label: "Low Stock",    color: "#d97706" },
  out_of_stock:  { label: "Out of Stock", color: "#dc2626" },
};

const EMPTY_FORM = {
  name: "", tagline: "", description: "",
  bg_color: "#1E5C2A", burst_light_color: "#2D7A3A", burst_dark_color: "#144020",
  rating: "4.5", reviews_count: "0", is_active: true,
  // variant fields
  weight: "", price: "", mrp: "", stock_status: "in_stock", stock_quantity: "0",
  tag: "", is_default: true,
  // image
  imageFile: null, imagePreviewUrl: null,
};

// ── auth helpers ─────────────────────────────────────────────
const getToken = () => localStorage.getItem("admin_access_token") ?? sessionStorage.getItem("access_token") ?? "";

const authHeaders = (isFormData = false) => {
  const h = { Authorization: `Bearer ${getToken()}` };
  if (!isFormData) h["Content-Type"] = "application/json";
  return h;
};

// ── api helpers ──────────────────────────────────────────────
async function apiFetch(path, opts = {}) {
  const res = await fetch(`${BASE}/api${path}`, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? `Error ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// ── shape API product into a flat row for the table ──────────
function flattenProduct(p) {
  const defaultVariant = p.variants?.find((v) => v.is_default) ?? p.variants?.[0] ?? {};
  return {
    id: p.id,
    name: p.name,
    tagline: p.tagline ?? "",
    description: p.description ?? "",
    category: "Makhana",          // API has no category field yet — keep for UI
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

// ── Component ────────────────────────────────────────────────
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
  const [previewIdx, setPreview] = useState(0);
  const fileRef                  = useRef();

  // ── fetch all products ──────────────────────────────────────
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch("/admin/products/", { headers: authHeaders() });
      setRows(data.map(flattenProduct));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // ── filtered list ──────────────────────────────────────────
  const filtered = rows.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  // ── open add form ──────────────────────────────────────────
  const openAdd = () => {
    setEditRow(null);
    setForm(EMPTY_FORM);
    setPreview(0);
    setShowForm(true);
  };

  // ── open edit form ─────────────────────────────────────────
  const openEdit = (p) => {
    const dv = p.defaultVariant;
    setEditRow(p);
    setForm({
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      bg_color: p.bg_color,
      burst_light_color: p.burst_light_color,
      burst_dark_color: p.burst_dark_color,
      rating: String(p.rating),
      reviews_count: String(p.reviews_count),
      is_active: p.status === "Active",
      weight: dv.weight ?? "",
      price: dv.price ? String(dv.price) : "",
      mrp: "",
      stock_status: dv.stock_status ?? "in_stock",
      stock_quantity: String(dv.stock_quantity ?? 0),
      tag: dv.tag ?? "",
      is_default: dv.is_default ?? true,
      imageFile: null,
      imagePreviewUrl: p.image,
    });
    setPreview(0);
    setShowForm(true);
  };

  // ── handle file pick ───────────────────────────────────────
  const handleFiles = (files) => {
    const file = files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, imageFile: file, imagePreviewUrl: url }));
  };

  // ── save (create or update) ────────────────────────────────
  const handleSave = async () => {
    if (!form.name || !form.price) return alert("Name and price are required.");
    setSaving(true);
    try {
      // 1. Build product FormData (includes image if chosen)
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("tagline", form.tagline);
      fd.append("description", form.description);
      fd.append("bg_color", form.bg_color);
      fd.append("burst_light_color", form.burst_light_color);
      fd.append("burst_dark_color", form.burst_dark_color);
      fd.append("rating", form.rating);
      fd.append("reviews_count", form.reviews_count);
      fd.append("is_active", form.is_active ? "true" : "false");
      if (form.imageFile) fd.append("image", form.imageFile);

      let product;
      if (editRow) {
        product = await apiFetch(`/admin/products/${editRow.id}/`, {
          method: "PATCH",
          headers: authHeaders(true),
          body: fd,
        });
      } else {
        product = await apiFetch("/admin/products/", {
          method: "POST",
          headers: authHeaders(true),
          body: fd,
        });
      }

      // 2. Handle variant
      const variantPayload = {
        product: product.id,
        weight: form.weight || "80g",
        price: Number(form.price),
        tag: form.tag,
        stock_status: form.stock_status,
        stock_quantity: Number(form.stock_quantity),
        is_default: true,
      };

      if (editRow && editRow.defaultVariant?.id) {
        // Update existing default variant
        await apiFetch(`/admin/variants/${editRow.defaultVariant.id}/`, {
          method: "PATCH",
          headers: authHeaders(),
          body: JSON.stringify(variantPayload),
        });
      } else {
        // Create new variant
        await apiFetch("/admin/variants/", {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify(variantPayload),
        });
      }

      await fetchProducts();
      setShowForm(false);
    } catch (e) {
      alert(`Save failed: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };

  // ── delete ─────────────────────────────────────────────────
  const deleteProduct = async (id) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await apiFetch(`/admin/products/${id}/`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      setRows((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      alert(`Delete failed: ${e.message}`);
    } finally {
      setDeleting(null);
    }
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((prev) => ({ ...prev, [key]: e.target.value })),
  });

  return (
    <div style={s.page}>
      {/* ── Header ── */}
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.pageTitle}>Products</h1>
          <p style={s.pageSubtitle}>Manage your product catalogue — add, edit, or remove items.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={s.refreshBtn} onClick={fetchProducts} title="Refresh">
            <RefreshCw size={15} />
          </button>
          <button style={s.addBtn} onClick={openAdd}>
            <Plus size={15} /> Add Product
          </button>
        </div>
      </div>

      {/* ── Error banner ── */}
      {error && (
        <div style={s.errorBanner}>
          <AlertCircle size={15} /> {error}
          <button style={s.retryBtn} onClick={fetchProducts}>Retry</button>
        </div>
      )}

      {/* ── Product list card ── */}
      <div style={s.card}>
        <div style={s.cardHeader}>
          <div>
            <h2 style={s.cardTitle}>Product List</h2>
            <p style={s.cardSubtitle}>{loading ? "Loading…" : `${filtered.length} products`}</p>
          </div>
          <div style={s.searchWrap}>
            <Search size={14} color="#9ca3af" />
            <input
              style={s.searchInput}
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div style={s.tableWrap}>
          {loading ? (
            <div style={s.loadingRow}>Loading products…</div>
          ) : (
            <table style={s.table}>
              <thead>
                <tr>
                  {["#", "Product", "Category", "Price", "Stock", "Status", "Action"].map((h) => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ ...s.td, textAlign: "center", color: "#9ca3af", padding: 32 }}>
                      No products found. Add your first product!
                    </td>
                  </tr>
                ) : filtered.map((p, i) => (
                  <tr key={p.id} style={s.tr}>
                    <td style={s.td}><span style={s.rowNum}>{String(i + 1).padStart(2, "0")}</span></td>
                    <td style={s.td}>
                      <div style={s.productCell}>
                        <div style={s.productThumb}>
                          {p.image
                            ? <img src={p.image} alt="" style={s.thumbImg} />
                            : <Package size={16} color="#9ca3af" />}
                        </div>
                        <div>
                          <span style={s.productName}>{p.name}</span>
                          {p.tagline && <p style={s.productTagline}>{p.tagline}</p>}
                        </div>
                      </div>
                    </td>
                    <td style={s.td}><span style={s.catBadge}>{p.category}</span></td>
                    <td style={s.td}><span style={s.price}>₹{p.price}</span></td>
                    <td style={s.td}>
                      <span style={{ color: STOCK_STYLE[p.stock_status]?.color ?? "#374151", fontWeight: 500, fontSize: 12 }}>
                        {STOCK_STYLE[p.stock_status]?.label ?? p.stock_status}
                        {p.stock > 0 && ` (${p.stock})`}
                      </span>
                    </td>
                    <td style={s.td}>
                      <span style={{ ...s.statusBadge, ...STATUS_STYLE[p.status] }}>{p.status}</span>
                    </td>
                    <td style={s.td}>
                      <div style={s.actions}>
                        {/* <button
                          style={{ ...s.actionBtn, color: "#16a34a" }}
                          title="View"
                          onClick={() => window.open(`${BASE}/api/products/`, "_blank")}
                        >
                          <Eye size={15} />
                        </button> */}
                        <button
                          style={{ ...s.actionBtn, color: "#d97706" }}
                          title="Edit"
                          onClick={() => openEdit(p)}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          style={{ ...s.actionBtn, color: deleting === p.id ? "#9ca3af" : "#dc2626" }}
                          title="Delete"
                          disabled={deleting === p.id}
                          onClick={() => deleteProduct(p.id)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── Add / Edit product drawer ── */}
      {showForm && (
        <div style={s.overlay} onClick={() => setShowForm(false)}>
          <div style={s.drawer} onClick={(e) => e.stopPropagation()}>

            {/* Drawer header */}
            <div style={s.drawerHeader}>
              <div style={s.drawerTitleRow}>
                <div style={s.drawerIconWrap}><Package size={18} color="#E8472A" /></div>
                <h2 style={s.drawerTitle}>{editRow ? "Edit Product" : "Add New Product"}</h2>
              </div>
              <div style={s.drawerActions}>
                <button style={s.saveDraftBtn} onClick={() => setShowForm(false)} disabled={saving}>
                  Cancel
                </button>
                <button style={{ ...s.saveBtn, opacity: saving ? 0.7 : 1 }} onClick={handleSave} disabled={saving}>
                  {saving ? "Saving…" : editRow ? "Update Product" : "Add Product"}
                </button>
                <button style={s.closeBtn} onClick={() => setShowForm(false)}><X size={18} /></button>
              </div>
            </div>

            {/* Two-column body */}
            <div style={s.drawerBody}>

              {/* LEFT — form */}
              <div style={s.formCol}>

                {/* Section: Basic Info */}
                <div style={s.formCard}>
                  <p style={s.sectionLabel}>Basic Information</p>
                  <p style={s.sectionSub}>Name, tagline and pricing details.</p>

                  <div style={s.row2}>
                    <div style={s.fieldWrap}>
                      <label style={s.label}>Product Name *</label>
                      <input style={s.input} placeholder="e.g. Himalayan Pink Salt Makhana" {...field("name")} />
                    </div>
                    <div style={s.fieldWrap}>
                      <label style={s.label}>Tagline</label>
                      <input style={s.input} placeholder="e.g. Light. Crunchy. Addictive." {...field("tagline")} />
                    </div>
                  </div>

                  <div style={s.row2}>
                    <div style={s.fieldWrap}>
                      <label style={s.label}>Weight</label>
                      <div style={s.selectWrap}>
                        <select style={s.select} {...field("weight")}>
                          <option value="">Select weight</option>
                          {WEIGHTS.map((w) => <option key={w}>{w}</option>)}
                        </select>
                        <ChevronDown size={14} style={s.chevron} />
                      </div>
                    </div>
                    <div style={s.fieldWrap}>
                      <label style={s.label}>Tag / Badge</label>
                      <input style={s.input} placeholder="e.g. BESTSELLER" {...field("tag")} />
                    </div>
                  </div>

                  <div style={s.row2}>
                    <div style={s.fieldWrap}>
                      <label style={s.label}>Selling Price (₹) *</label>
                      <input style={s.input} placeholder="e.g. 199" type="number" {...field("price")} />
                    </div>
                    <div style={s.fieldWrap}>
                      <label style={s.label}>Stock Quantity</label>
                      <input style={s.input} placeholder="e.g. 100" type="number" {...field("stock_quantity")} />
                    </div>
                  </div>

                  <div style={s.row2}>
                    <div style={s.fieldWrap}>
                      <label style={s.label}>Stock Status</label>
                      <div style={s.selectWrap}>
                        <select style={s.select} {...field("stock_status")}>
                          <option value="in_stock">In Stock</option>
                          <option value="low_stock">Low Stock</option>
                          <option value="out_of_stock">Out of Stock</option>
                        </select>
                        <ChevronDown size={14} style={s.chevron} />
                      </div>
                    </div>
                    <div style={s.fieldWrap}>
                      <label style={s.label}>Status</label>
                      <div style={s.selectWrap}>
                        <select
                          style={s.select}
                          value={form.is_active ? "Active" : "Inactive"}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, is_active: e.target.value === "Active" }))
                          }
                        >
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                        <ChevronDown size={14} style={s.chevron} />
                      </div>
                    </div>
                  </div>

                  <div style={s.row2}>
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

                {/* Section: Theme Colors */}
                <div style={s.formCard}>
                  <p style={s.sectionLabel}>Theme Colors</p>
                  <p style={s.sectionSub}>Used for the product hero / burst ray background on the storefront.</p>
                  <div style={s.row3}>
                    {[
                      { key: "bg_color", label: "Background" },
                      { key: "burst_light_color", label: "Burst Light" },
                      { key: "burst_dark_color", label: "Burst Dark" },
                    ].map(({ key, label }) => (
                      <div key={key} style={s.fieldWrap}>
                        <label style={s.label}>{label}</label>
                        <div style={s.colorRow}>
                          <input type="color" value={form[key]}
                            onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                            style={s.colorPicker} />
                          <input style={{ ...s.input, flex: 1 }} {...field(key)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section: Description */}
                <div style={s.formCard}>
                  <p style={s.sectionLabel}>Description</p>
                  <p style={s.sectionSub}>Short product description shown on listing.</p>
                  <textarea
                    style={{ ...s.input, height: 90, resize: "vertical" }}
                    placeholder="Describe the product…"
                    {...field("description")}
                  />
                </div>

                {/* Section: Upload */}
                <div style={s.formCard}>
                  <p style={s.sectionLabel}>Product Image</p>
                  <p style={s.sectionSub}>Upload the main product image (PNG, JPG up to 5MB).</p>

                  <div
                    style={s.dropZone}
                    onClick={() => fileRef.current.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
                  >
                    <Upload size={28} color="#9ca3af" style={{ marginBottom: 8 }} />
                    <p style={s.dropText}>Upload your image, or <span style={s.browseLink}>browse</span></p>
                    <p style={s.dropHint}>PNG, JPG up to 5MB</p>
                    <input
                      ref={fileRef} type="file" accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleFiles(e.target.files)}
                    />
                  </div>

                  {form.imagePreviewUrl && (
                    <div style={s.thumbStrip}>
                      <div style={{ ...s.thumbItem, outline: "2px solid #E8472A" }}>
                        <img src={form.imagePreviewUrl} alt="" style={s.thumbImg} />
                        <button
                          style={s.thumbRemove}
                          onClick={() => setForm((prev) => ({ ...prev, imageFile: null, imagePreviewUrl: null }))}
                        ><X size={10} /></button>
                      </div>
                    </div>
                  )}
                </div>

                <div style={s.formFooter}>
                  <button style={s.cancelBtn} onClick={() => setShowForm(false)} disabled={saving}>Cancel</button>
                  <button style={{ ...s.saveBtn, opacity: saving ? 0.7 : 1 }} onClick={handleSave} disabled={saving}>
                    {saving ? "Saving…" : editRow ? "Update Product" : "Save Product"}
                  </button>
                </div>
              </div>

              {/* RIGHT — live preview */}
              <div style={s.previewCol}>
                <div style={s.previewCard}>
                  <p style={s.sectionLabel}>Preview</p>
                  <p style={s.sectionSub}>How the product will look in the listing.</p>

                  <div style={{ ...s.previewMain, backgroundColor: form.bg_color }}>
                    {form.imagePreviewUrl
                      ? <img src={form.imagePreviewUrl} alt="" style={s.previewImg} />
                      : (
                        <div style={s.previewPlaceholder}>
                          <ImagePlus size={36} color="rgba(255,255,255,0.4)" />
                          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 8 }}>No image yet</p>
                        </div>
                      )
                    }
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <p style={s.previewName}>{form.name || "Product Name"}</p>
                    <p style={s.previewCat}>{form.tagline || "Tagline goes here"}</p>
                    {form.tag && (
                      <span style={s.previewTag}>{form.tag}</span>
                    )}
                    <div style={s.previewPriceRow}>
                      {form.price && <span style={s.previewPrice}>₹{form.price}</span>}
                      {form.weight && <span style={s.previewWeight}>{form.weight}</span>}
                    </div>
                    <p style={{
                      fontSize: 12, marginTop: 6,
                      color: STOCK_STYLE[form.stock_status]?.color ?? "#374151",
                    }}>
                      {STOCK_STYLE[form.stock_status]?.label ?? ""}
                      {form.stock_quantity && ` · ${form.stock_quantity} units`}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Styles ───────────────────────────────────────────────────
const s = {
  page: { fontFamily: "Inter, sans-serif" },
  pageHeader: {
    display: "flex", alignItems: "flex-start", justifyContent: "space-between",
    flexWrap: "wrap", gap: 12, marginBottom: 24,
  },
  pageTitle:    { fontSize: 26, fontWeight: 700, color: "#111827", margin: 0 },
  pageSubtitle: { fontSize: 13, color: "#6b7280", margin: "4px 0 0" },
  addBtn: {
    display: "flex", alignItems: "center", gap: 6,
    backgroundColor: "#E8472A", color: "#fff", border: "none",
    borderRadius: 8, padding: "10px 18px", fontSize: 13,
    fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif",
  },
  refreshBtn: {
    display: "flex", alignItems: "center", justifyContent: "center",
    backgroundColor: "#f9fafb", border: "1px solid #e5e7eb",
    borderRadius: 8, padding: "10px 12px", cursor: "pointer", color: "#6b7280",
  },

  errorBanner: {
    display: "flex", alignItems: "center", gap: 8,
    backgroundColor: "#fee2e2", color: "#dc2626", borderRadius: 8,
    padding: "10px 16px", marginBottom: 16, fontSize: 13,
  },
  retryBtn: {
    marginLeft: "auto", background: "none", border: "1px solid #dc2626",
    color: "#dc2626", borderRadius: 6, padding: "4px 10px",
    fontSize: 12, cursor: "pointer",
  },
  loadingRow: {
    padding: "40px 24px", textAlign: "center", color: "#9ca3af", fontSize: 14,
  },

  card: {
    backgroundColor: "#fff", borderRadius: 14,
    border: "1px solid #f0f0f0", overflow: "hidden",
  },
  cardHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "20px 24px 16px", borderBottom: "1px solid #f5f5f5",
    flexWrap: "wrap", gap: 12,
  },
  cardTitle:    { fontSize: 16, fontWeight: 700, color: "#111827", margin: 0 },
  cardSubtitle: { fontSize: 12, color: "#9ca3af", margin: "2px 0 0" },
  searchWrap: {
    display: "flex", alignItems: "center", gap: 8,
    backgroundColor: "#f9fafb", border: "1px solid #e5e7eb",
    borderRadius: 8, padding: "8px 12px",
  },
  searchInput: {
    border: "none", background: "none", outline: "none",
    fontSize: 13, color: "#374151", fontFamily: "Inter, sans-serif", width: 200,
  },

  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: 640 },
  th: {
    padding: "10px 16px", textAlign: "left", fontSize: 12,
    fontWeight: 600, color: "#6b7280", backgroundColor: "#fafafa",
    borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap",
  },
  tr: { borderBottom: "1px solid #f9f9f9" },
  td: { padding: "13px 16px", fontSize: 13, color: "#374151", whiteSpace: "nowrap" },
  rowNum: { fontWeight: 600, color: "#9ca3af" },

  productCell:    { display: "flex", alignItems: "center", gap: 10 },
  productThumb: {
    width: 38, height: 38, borderRadius: 8,
    backgroundColor: "#f3f4f6", display: "flex",
    alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0,
  },
  thumbImg:       { width: "100%", height: "100%", objectFit: "cover" },
  productName:    { fontWeight: 500, color: "#111827", display: "block" },
  productTagline: { fontSize: 11, color: "#9ca3af", margin: "2px 0 0" },
  catBadge: {
    backgroundColor: "#f3f4f6", color: "#374151",
    borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 500,
  },
  price:       { fontWeight: 600, color: "#111827" },
  statusBadge: { display: "inline-block", padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500 },
  actions:     { display: "flex", alignItems: "center", gap: 8 },
  actionBtn:   {
    background: "none", border: "none", cursor: "pointer",
    padding: 4, borderRadius: 4, display: "flex", alignItems: "center",
  },

  // ── Drawer ──
  overlay: {
    position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1000, display: "flex", alignItems: "flex-start", justifyContent: "flex-end",
  },
  drawer: {
    backgroundColor: "#f5f5f5", width: "min(96vw, 960px)", height: "100vh",
    overflowY: "auto", display: "flex", flexDirection: "column",
  },
  drawerHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "18px 24px", backgroundColor: "#fff",
    borderBottom: "1px solid #f0f0f0", flexWrap: "wrap", gap: 10,
  },
  drawerTitleRow: { display: "flex", alignItems: "center", gap: 10 },
  drawerIconWrap: {
    width: 36, height: 36, borderRadius: 8,
    backgroundColor: "#fff3f1", display: "flex", alignItems: "center", justifyContent: "center",
  },
  drawerTitle:   { fontSize: 16, fontWeight: 700, color: "#111827", margin: 0 },
  drawerActions: { display: "flex", alignItems: "center", gap: 10 },
  saveDraftBtn: {
    backgroundColor: "#fff", border: "1px solid #e5e7eb",
    borderRadius: 8, padding: "8px 14px", fontSize: 13,
    fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: "Inter, sans-serif",
  },
  saveBtn: {
    display: "flex", alignItems: "center", gap: 6,
    backgroundColor: "#E8472A", color: "#fff", border: "none",
    borderRadius: 8, padding: "8px 16px", fontSize: 13,
    fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif",
  },
  closeBtn: {
    background: "none", border: "none", cursor: "pointer",
    color: "#6b7280", padding: 4, display: "flex", alignItems: "center",
  },

  drawerBody: {
    display: "grid", gridTemplateColumns: "1fr 300px",
    gap: 16, padding: 20, flex: 1,
  },
  formCol:    { display: "flex", flexDirection: "column", gap: 16 },
  previewCol: { display: "flex", flexDirection: "column", gap: 16 },

  formCard: {
    backgroundColor: "#fff", borderRadius: 12,
    border: "1px solid #f0f0f0", padding: "20px 20px 16px",
  },
  sectionLabel: { fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 2px" },
  sectionSub:   { fontSize: 12, color: "#9ca3af", margin: "0 0 16px" },

  row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 },
  row3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 },
  fieldWrap: { display: "flex", flexDirection: "column", gap: 5 },
  label: { fontSize: 12, fontWeight: 500, color: "#374151" },
  input: {
    border: "1px solid #e5e7eb", borderRadius: 8,
    padding: "9px 12px", fontSize: 13, color: "#111827",
    fontFamily: "Inter, sans-serif", outline: "none", width: "100%",
    boxSizing: "border-box", backgroundColor: "#fff",
  },
  selectWrap: { position: "relative" },
  select: {
    border: "1px solid #e5e7eb", borderRadius: 8,
    padding: "9px 32px 9px 12px", fontSize: 13, color: "#111827",
    fontFamily: "Inter, sans-serif", outline: "none", width: "100%",
    appearance: "none", backgroundColor: "#fff", cursor: "pointer",
  },
  chevron: {
    position: "absolute", right: 10, top: "50%",
    transform: "translateY(-50%)", pointerEvents: "none", color: "#6b7280",
  },
  colorRow:   { display: "flex", alignItems: "center", gap: 8 },
  colorPicker: {
    width: 36, height: 36, border: "1px solid #e5e7eb",
    borderRadius: 8, padding: 2, cursor: "pointer", backgroundColor: "#fff",
  },

  dropZone: {
    border: "2px dashed #e5e7eb", borderRadius: 10,
    padding: "28px 20px", textAlign: "center",
    cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center",
  },
  dropText:   { fontSize: 13, color: "#374151", margin: 0 },
  dropHint:   { fontSize: 12, color: "#9ca3af", marginTop: 4 },
  browseLink: { color: "#E8472A", fontWeight: 500, textDecoration: "underline", cursor: "pointer" },

  thumbStrip:  { display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" },
  thumbItem:   { position: "relative", width: 56, height: 56, borderRadius: 8, overflow: "hidden" },
  thumbRemove: {
    position: "absolute", top: 2, right: 2,
    backgroundColor: "rgba(0,0,0,0.55)", border: "none",
    borderRadius: "50%", width: 16, height: 16,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", color: "#fff", padding: 0,
  },

  formFooter: {
    display: "flex", gap: 10, justifyContent: "flex-end", paddingBottom: 4,
  },
  cancelBtn: {
    backgroundColor: "#fff", border: "1px solid #e5e7eb",
    borderRadius: 8, padding: "10px 20px", fontSize: 13,
    fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: "Inter, sans-serif",
  },

  // Preview panel
  previewCard: {
    backgroundColor: "#fff", borderRadius: 12,
    border: "1px solid #f0f0f0", padding: "20px",
    position: "sticky", top: 16,
  },
  previewMain: {
    width: "100%", aspectRatio: "1 / 1", borderRadius: 10,
    overflow: "hidden", display: "flex", alignItems: "center",
    justifyContent: "center", marginBottom: 10, transition: "background-color 0.3s",
  },
  previewImg:         { width: "100%", height: "100%", objectFit: "cover" },
  previewPlaceholder: { display: "flex", flexDirection: "column", alignItems: "center" },
  previewName:     { fontSize: 15, fontWeight: 700, color: "#111827", margin: "0 0 2px" },
  previewCat:      { fontSize: 12, color: "#9ca3af", margin: 0 },
  previewTag: {
    display: "inline-block", marginTop: 6,
    backgroundColor: "#fff3f1", color: "#E8472A",
    borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600,
  },
  previewPriceRow: { display: "flex", alignItems: "center", gap: 8, marginTop: 6 },
  previewPrice:    { fontSize: 18, fontWeight: 700, color: "#E8472A" },
  previewWeight:   { fontSize: 13, color: "#6b7280", backgroundColor: "#f3f4f6", borderRadius: 20, padding: "2px 8px" },
};