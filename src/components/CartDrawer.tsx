import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Truck, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  if (!isOpen) return null;

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('Karachi');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank'>('cod');
  const [orderId, setOrderId] = useState<string>('');

  const subtotalPKR = items.reduce((sum, item) => sum + (item.product.pricePKR * item.quantity), 0);
  const freeDelivery = subtotalPKR >= 40000;
  const deliveryFeePKR = items.length === 0 ? 0 : (freeDelivery ? 0 : 2500);
  const totalPKR = subtotalPKR + deliveryFeePKR;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address) return;
    const generatedId = 'AC-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setCheckoutStep('success');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleFinish = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
      <div 
        className="w-full max-w-md h-full bg-[#14171f] border-l border-white/[0.08] shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 bg-[#0f1115] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="font-display text-lg font-bold text-white">
              {checkoutStep === 'cart' && 'Your Order Bag'}
              {checkoutStep === 'checkout' && 'Complete Delivery Order'}
              {checkoutStep === 'success' && 'Order Confirmed'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {checkoutStep === 'cart' && (
            <div>
              {items.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-slate-500">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-semibold text-white">Your bag is empty</div>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Explore our 100% termite-proof aluminum beds, sofas, wardrobes, and kitchen modules.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Delivery Threshold Banner */}
                  <div className="p-3 rounded-lg bg-[#0f1115] border border-white/[0.06] flex items-center gap-2.5 text-xs">
                    <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-slate-300">
                      {freeDelivery
                        ? '🎉 You unlocked Free Delivery across Pakistan!'
                        : `Add PKR ${(40000 - subtotalPKR).toLocaleString()} more for Free Doorstep Delivery.`}
                    </span>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div 
                        key={item.product.id}
                        className="p-3.5 rounded-xl bg-[#0f1115] border border-white/[0.06] flex gap-3 items-center"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-lg object-cover shrink-0 border border-white/[0.08]"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-white truncate">{item.product.name}</h4>
                          <div className="text-[11px] text-slate-400 capitalize">Finish: {item.selectedFinish}</div>
                          <div className="font-mono text-xs font-bold text-amber-400 mt-1">
                            PKR {(item.product.pricePKR * item.quantity).toLocaleString()}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-slate-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded border border-white/[0.08] text-xs font-mono text-white">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="text-slate-400 hover:text-white cursor-pointer px-1"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="text-slate-400 hover:text-white cursor-pointer px-1"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {checkoutStep === 'checkout' && (
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                Doorstep Delivery Details
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Asna / Ayaz"
                  className="w-full p-2.5 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">WhatsApp / Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0300-1234567"
                  className="w-full p-2.5 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Delivery City (Pakistan)</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="Karachi">Karachi (Sindh)</option>
                  <option value="Lahore">Lahore (Punjab)</option>
                  <option value="Islamabad">Islamabad (Federal)</option>
                  <option value="Rawalpindi">Rawalpindi (Punjab)</option>
                  <option value="Faisalabad">Faisalabad (Punjab)</option>
                  <option value="Peshawar">Peshawar (KPK)</option>
                  <option value="Multan">Multan (Punjab)</option>
                  <option value="Sialkot">Sialkot (Punjab)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Complete Street / Area Address</label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House #, Street #, Sector / Phase, Landmark"
                  className="w-full p-2.5 rounded-lg bg-black/40 border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-2">Payment Method</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-amber-400 bg-amber-400/[0.08] text-white font-medium'
                        : 'border-white/[0.08] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div>Cash on Delivery</div>
                    <div className="text-[10px] text-slate-500">Pay upon delivery</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      paymentMethod === 'bank'
                        ? 'border-amber-400 bg-amber-400/[0.08] text-white font-medium'
                        : 'border-white/[0.08] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div>Bank Transfer</div>
                    <div className="text-[10px] text-slate-500">Meezan / HBL / UBL</div>
                  </button>
                </div>
              </div>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
              <h4 className="font-display text-2xl font-bold text-white">Order Confirmed!</h4>
              <p className="text-xs text-slate-300 max-w-xs mx-auto">
                Thank you for choosing AlumiCraft. Your order <span className="font-mono text-amber-400 font-bold">{orderId}</span> has been scheduled for manufacturing and dispatch to {city}.
              </p>
              
              <div className="p-3.5 bg-black/40 rounded-xl text-left font-mono text-xs space-y-1.5 text-slate-300 border border-white/[0.06]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Customer:</span>
                  <span className="text-white">{customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <span className="text-white">{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment:</span>
                  <span className="text-white uppercase">{paymentMethod}</span>
                </div>
                <div className="flex justify-between font-bold pt-1 border-t border-white/[0.06]">
                  <span className="text-slate-400">Total:</span>
                  <span className="text-amber-400">PKR {totalPKR.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>25-Year Structural Termite Warranty certificate will be enclosed in your shipment package.</span>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-5 bg-[#0f1115] border-t border-white/[0.08] space-y-3">
          {checkoutStep !== 'success' && (
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="font-mono text-white tabular-nums">PKR {subtotalPKR.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Doorstep Delivery:</span>
                <span className="font-mono text-white tabular-nums">
                  {deliveryFeePKR === 0 ? <span className="text-emerald-400">FREE</span> : `PKR ${deliveryFeePKR.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/[0.06]">
                <span>Total Amount:</span>
                <span className="font-mono text-amber-400 tabular-nums">PKR {totalPKR.toLocaleString()}</span>
              </div>
            </div>
          )}

          {checkoutStep === 'cart' && (
            <button
              onClick={() => setCheckoutStep('checkout')}
              disabled={items.length === 0}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-amber-400/20"
            >
              <span>Proceed to Delivery (COD)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {checkoutStep === 'checkout' && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCheckoutStep('cart')}
                className="py-3 px-3 text-xs text-slate-300 hover:text-white bg-white/[0.06] rounded-lg transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                form="checkout-form"
                className="flex-1 py-3 px-4 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-md shadow-amber-400/20"
              >
                Confirm Order (PKR {totalPKR.toLocaleString()})
              </button>
            </div>
          )}

          {checkoutStep === 'success' && (
            <button
              onClick={handleFinish}
              className="w-full py-3 px-4 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              Done &amp; Continue Browsing
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
