"use client"

import { useState } from "react"
import { ShoppingCart, Heart, X, Star, Store, Truck, Shield, ChevronRight, Minus, Plus, Zap, Users, Filter, SlidersHorizontal } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  seller: string
  sellerRating: number
  rating: number
  reviews: number
  liked: boolean
  quantity: number
  description?: string
  inStock?: boolean
  freeShipping?: boolean
  vitaPrice?: number
  buyers?: number
}

const products: Product[] = [
  {
    id: "1",
    name: "Organic Green Tea Set",
    price: 3200,
    image: "/organic-tea.jpg",
    category: "Nutrition",
    seller: "Green Haven Algiers",
    sellerRating: 4.9,
    rating: 4.8,
    reviews: 234,
    liked: false,
    quantity: 0,
    description: "Premium organic green tea collection with beautiful packaging. Sourced from the finest tea gardens.",
    inStock: true,
    freeShipping: true,
    vitaPrice: 320,
    buyers: 20,
  },
  {
    id: "2",
    name: "Eco-Friendly Water Bottle",
    price: 4500,
    image: "/clear-water-bottle.png",
    category: "Eco-Friendly",
    seller: "EcoLife Oran",
    sellerRating: 4.8,
    rating: 4.9,
    reviews: 567,
    liked: false,
    quantity: 0,
    description: "Sustainable, BPA-free water bottle made from recycled materials. Keeps drinks cold for 24 hours.",
    inStock: true,
    freeShipping: true,
    vitaPrice: 450,
    buyers: 35,
  },
  {
    id: "3",
    name: "Yoga Mat Bundle",
    price: 5500,
    image: "/yoga-mat.jpg",
    category: "Fitness",
    seller: "ZenFlow Constantine",
    sellerRating: 4.7,
    rating: 4.7,
    reviews: 312,
    liked: false,
    quantity: 0,
    description: "Premium yoga mat with carrying strap and alignment guides. Non-slip surface for all practices.",
    inStock: true,
    freeShipping: false,
    vitaPrice: 550,
    buyers: 12,
  },
  {
    id: "4",
    name: "Vitamin Supplements Pack",
    price: 3500,
    image: "/assorted-vitamins.png",
    category: "Health",
    seller: "VitaPlus Algiers",
    sellerRating: 4.9,
    rating: 4.6,
    reviews: 189,
    liked: false,
    quantity: 0,
    description: "Complete vitamin and mineral supplement package. 30-day supply with essential nutrients.",
    inStock: true,
    freeShipping: true,
    vitaPrice: 350,
    buyers: 28,
  },
  {
    id: "5",
    name: "Meditation Cushion",
    price: 2800,
    image: "/meditation-cushion.jpg",
    category: "Wellness",
    seller: "MindFlow Blida",
    sellerRating: 4.6,
    rating: 4.8,
    reviews: 156,
    liked: false,
    quantity: 0,
    description: "Ergonomic meditation cushion for comfortable practice. Filled with organic buckwheat hulls.",
    inStock: true,
    freeShipping: false,
    vitaPrice: 280,
    buyers: 15,
  },
  {
    id: "6",
    name: "Bamboo Cutting Board Set",
    price: 2200,
    image: "/bamboo-cutting-board.jpg",
    category: "Kitchen",
    seller: "EcoHome Setif",
    sellerRating: 4.8,
    rating: 4.9,
    reviews: 98,
    liked: false,
    quantity: 0,
    description: "Sustainable bamboo cutting board set for healthy cooking. Set of 3 different sizes.",
    inStock: true,
    freeShipping: true,
    vitaPrice: 220,
    buyers: 8,
  },
  {
    id: "7",
    name: "Resistance Bands Set",
    price: 1800,
    image: "/yoga-mat.jpg",
    category: "Fitness",
    seller: "FitGear Annaba",
    sellerRating: 4.5,
    rating: 4.7,
    reviews: 445,
    liked: false,
    quantity: 0,
    description: "Complete resistance bands set with 5 levels. Perfect for home workouts and rehabilitation.",
    inStock: true,
    freeShipping: true,
    vitaPrice: 180,
    buyers: 42,
  },
  {
    id: "8",
    name: "Herbal Sleep Tea",
    price: 1500,
    image: "/organic-tea.jpg",
    category: "Wellness",
    seller: "Natural Remedies DZ",
    sellerRating: 4.9,
    rating: 4.9,
    reviews: 678,
    liked: false,
    quantity: 0,
    description: "Calming herbal blend with chamomile and lavender. Promotes restful sleep naturally.",
    inStock: true,
    freeShipping: false,
    vitaPrice: 150,
    buyers: 55,
  },
]

interface ProductModalProps {
  product: Product
  currency: "DZD" | "VP"
  onClose: () => void
  onAddToCart: (id: string) => void
  onToggleWishlist: (id: string) => void
  onUpdateQuantity: (id: string, qty: number) => void
}

function ProductModal({ product, currency, onClose, onAddToCart, onToggleWishlist, onUpdateQuantity }: ProductModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div
        className="bg-card border-2 border-border rounded-t-3xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-1/2 h-56 sm:h-auto bg-secondary">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-card rounded-full p-2 transition-all"
            >
              <X size={18} />
            </button>
            {product.freeShipping && (
              <div className="absolute bottom-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                <Truck size={12} />
                Free Shipping
              </div>
            )}
          </div>

          <div className="flex-1 p-5 sm:p-6">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs text-primary font-semibold uppercase tracking-wider">{product.category}</span>
              <button
                onClick={() => onToggleWishlist(product.id)}
                className="p-1.5 rounded-full hover:bg-secondary transition-all"
              >
                <Heart
                  size={18}
                  fill={product.liked ? "#ef4444" : "none"}
                  color={product.liked ? "#ef4444" : "currentColor"}
                />
              </button>
            </div>

            <h2 className="text-xl font-bold text-foreground mb-4">{product.name}</h2>

            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Store size={18} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{product.seller}</p>
                <div className="flex items-center gap-1">
                  <Star size={12} fill="#2ECC71" color="#2ECC71" />
                  <span className="text-xs text-muted-foreground">{product.sellerRating} seller rating</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating) ? "#2ECC71" : "none"}
                    color={i < Math.floor(product.rating) ? "#2ECC71" : "#e2e8f0"}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{product.description}</p>

            <div className="flex items-baseline gap-2 mb-4">
              {currency === "VP" && product.vitaPrice ? (
                <>
                  <Zap size={18} className="text-primary" />
                  <span className="text-3xl font-bold text-foreground">{product.vitaPrice}</span>
                  <span className="text-lg text-muted-foreground">VP</span>
                </>
              ) : (
                <>
                  <span className="text-3xl font-bold text-foreground">{product.price.toLocaleString()}</span>
                  <span className="text-lg text-muted-foreground">DZD</span>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {product.inStock ? (
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1">
                  <Shield size={12} />
                  In Stock
                </span>
              ) : (
                <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full">Out of Stock</span>
              )}
              {product.freeShipping && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1">
                  <Truck size={12} />
                  Free Delivery
                </span>
              )}
            </div>

            {product.quantity > 0 ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center border-2 border-border rounded-xl">
                  <button
                    onClick={() => onUpdateQuantity(product.id, product.quantity - 1)}
                    className="p-2 hover:bg-secondary transition-colors rounded-l-xl"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-semibold">{product.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(product.id, product.quantity + 1)}
                    className="p-2 hover:bg-secondary transition-colors rounded-r-xl"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={onClose}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all"
                >
                  View Panier ({product.quantity * product.price} DZD)
                </button>
              </div>
            ) : (
              <button
                onClick={() => onAddToCart(product.id)}
                disabled={!product.inStock}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                Add to Panier
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  const [shopProducts, setShopProducts] = useState(products)
  const [showWishlist, setShowWishlist] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currency, setCurrency] = useState<"DZD" | "VP">("DZD")
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const cartItems = shopProducts.filter((p) => p.quantity > 0)
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const wishlistItems = shopProducts.filter((p) => p.liked)
  const categories = ["all", ...new Set(products.map((p) => p.category))]

  const filteredProducts =
    selectedCategory === "all" ? shopProducts : shopProducts.filter((p) => p.category === selectedCategory)

  const categoryCounts = categories.reduce(
    (acc, cat) => {
      acc[cat] = cat === "all" ? shopProducts.length : shopProducts.filter((p) => p.category === cat).length
      return acc
    },
    {} as Record<string, number>,
  )

  const updateQuantity = (id: string, newQuantity: number) => {
    setShopProducts(shopProducts.map((p) => (p.id === id ? { ...p, quantity: Math.max(0, newQuantity) } : p)))
    if (selectedProduct?.id === id) {
      setSelectedProduct((prev) => (prev ? { ...prev, quantity: Math.max(0, newQuantity) } : null))
    }
  }

  const toggleWishlist = (id: string) => {
    setShopProducts(shopProducts.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p)))
    if (selectedProduct?.id === id) {
      setSelectedProduct((prev) => (prev ? { ...prev, liked: !prev.liked } : null))
    }
  }

  const handleAddToCart = (id: string) => {
    updateQuantity(id, (shopProducts.find((p) => p.id === id)?.quantity || 0) + 1)
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <header className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b-2 border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-foreground">Wellness Shop</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Curated health products from Algeria</p>
            </div>
            <div className="flex gap-1.5 sm:gap-2 items-center">
              {/* Currency Toggle */}
              <div className="flex items-center bg-secondary/50 rounded-xl border-2 border-border overflow-hidden">
                <button
                  onClick={() => setCurrency("DZD")}
                  className={`px-2.5 sm:px-3 py-1.5 text-xs font-bold transition-all ${
                    currency === "DZD"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  DA
                </button>
                <button
                  onClick={() => setCurrency("VP")}
                  className={`px-2.5 sm:px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1 ${
                    currency === "VP"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Zap size={12} />
                  VP
                </button>
              </div>

              {/* Mobile filter */}
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl border-2 border-border hover:bg-secondary/50 transition-all"
              >
                <SlidersHorizontal size={18} className="text-muted-foreground" />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setShowWishlist(!showWishlist)}
                className="relative p-2 rounded-xl hover:bg-secondary/80 transition-all hidden sm:block"
              >
                <Heart
                  size={20}
                  className={wishlistItems.length > 0 ? "text-destructive" : "text-muted-foreground"}
                  fill={wishlistItems.length > 0 ? "currentColor" : "none"}
                />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-card text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {wishlistItems.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button className="relative p-2 rounded-xl hover:bg-secondary/80 transition-all">
                <ShoppingCart
                  size={20}
                  className={cartItems.length > 0 ? "text-primary" : "text-muted-foreground"}
                />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Filter Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMobileSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute left-0 top-0 bottom-0 w-72 bg-card border-r-2 border-border p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-foreground">Filters</h3>
              <button onClick={() => setMobileSidebarOpen(false)} className="p-1 rounded-lg hover:bg-secondary">
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Category</h4>
            <nav className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat)
                    setMobileSidebarOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-primary/10 text-primary border-2 border-primary/20"
                      : "text-muted-foreground hover:bg-secondary/50 border-2 border-transparent"
                  }`}
                >
                  <span>{cat === "all" ? "All Products" : cat}</span>
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">{categoryCounts[cat]}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Side Filter */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-36">
              <h3 className="font-bold text-foreground mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
                <Filter size={14} />
                Filters
              </h3>

              <div className="mb-6">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Category</h4>
                <nav className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                        selectedCategory === cat
                          ? "bg-primary/10 text-primary border-2 border-primary/20"
                          : "text-muted-foreground hover:bg-secondary/50 border-2 border-transparent"
                      }`}
                    >
                      <span>{cat === "all" ? "All" : cat}</span>
                      <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded-full">
                        {categoryCounts[cat]}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Price range hint */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Price Range</h4>
                <div className="bg-card border-2 border-border rounded-xl p-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>1,500 DZD</span>
                    <span>8,000 DZD</span>
                  </div>
                  <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "70%" }} />
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="bg-card border-2 border-border rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={14} className="text-primary" />
                  <h4 className="text-xs font-bold text-foreground">Your VP Balance</h4>
                </div>
                <p className="text-2xl font-bold text-foreground">2,650</p>
                <p className="text-[10px] text-muted-foreground">Use VP to buy products</p>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{filteredProducts.length} products</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all hover:shadow-lg group cursor-pointer"
                >
                  <div className="relative aspect-square bg-secondary overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWishlist(product.id)
                      }}
                      className="absolute top-2 right-2 bg-card/90 hover:bg-card rounded-full p-1.5 transition-all shadow-sm"
                    >
                      <Heart
                        size={14}
                        fill={product.liked ? "#ef4444" : "none"}
                        color={product.liked ? "#ef4444" : "currentColor"}
                        className="text-muted-foreground"
                      />
                    </button>
                    {product.freeShipping && (
                      <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-medium px-2 py-0.5 rounded-full">
                        Free Delivery
                      </div>
                    )}
                  </div>

                  <div className="p-2.5 sm:p-3">
                    <div className="flex items-center gap-1 mb-1">
                      <Star size={11} fill="#2ECC71" color="#2ECC71" />
                      <span className="text-[10px] sm:text-xs text-muted-foreground">{product.rating}</span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground">({product.reviews})</span>
                    </div>

                    <h3 className="font-medium text-foreground text-xs sm:text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-[10px] sm:text-xs text-muted-foreground mb-1 truncate">{product.seller}</p>

                    {product.buyers && product.buyers > 0 && (
                      <div className="flex items-center gap-1 mb-1.5">
                        <Users size={9} className="text-primary" />
                        <span className="text-[9px] sm:text-[10px] font-bold text-primary">
                          {product.buyers} Vitalians bought this today
                        </span>
                      </div>
                    )}

                    <div className="flex items-baseline gap-1">
                      {currency === "VP" && product.vitaPrice ? (
                        <>
                          <Zap size={12} className="text-primary" />
                          <span className="text-sm sm:text-lg font-bold text-foreground">{product.vitaPrice}</span>
                          <span className="text-[10px] sm:text-xs text-muted-foreground">VP</span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm sm:text-lg font-bold text-foreground">
                            {product.price.toLocaleString()}
                          </span>
                          <span className="text-[10px] sm:text-xs text-muted-foreground">DZD</span>
                        </>
                      )}
                    </div>

                    {product.quantity > 0 ? (
                      <div className="flex items-center justify-between mt-2 sm:mt-3 bg-primary/10 rounded-lg p-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            updateQuantity(product.id, product.quantity - 1)
                          }}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-primary font-bold hover:bg-primary/20 rounded-lg transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-bold text-foreground text-sm">{product.quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            updateQuantity(product.id, product.quantity + 1)
                          }}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-primary font-bold hover:bg-primary/20 rounded-lg transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddToCart(product.id)
                        }}
                        className="w-full mt-2 sm:mt-3 bg-primary text-primary-foreground py-1.5 sm:py-2 rounded-lg hover:bg-primary/90 transition-all text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5"
                      >
                        <ShoppingCart size={13} />
                        Add
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar - Desktop only */}
          <div className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-36">
              <div className="bg-card border-2 border-border rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingCart size={18} className="text-primary" />
                  <h2 className="font-semibold text-foreground">Your Panier</h2>
                </div>

                {cartItems.length > 0 ? (
                  <>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-2 p-2 bg-secondary/30 rounded-lg">
                          <div className="w-10 h-10 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.price.toLocaleString()} DZD x {item.quantity}
                            </p>
                          </div>
                          <button
                            onClick={() => updateQuantity(item.id, 0)}
                            className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-3 mt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium text-foreground">{cartTotal.toLocaleString()} DZD</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className="text-primary font-medium">Free</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t border-border">
                        <span className="text-foreground">Total</span>
                        <span className="text-foreground">{cartTotal.toLocaleString()} DZD</span>
                      </div>
                      <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl hover:bg-primary/90 transition-all font-medium mt-2">
                        Checkout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="py-8 text-center">
                    <ShoppingCart size={32} className="mx-auto mb-2 text-muted-foreground/40" />
                    <p className="text-sm text-muted-foreground">Your panier is empty</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          currency={currency}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={toggleWishlist}
          onUpdateQuantity={updateQuantity}
        />
      )}
    </div>
  )
}
