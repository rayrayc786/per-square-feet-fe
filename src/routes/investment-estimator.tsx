import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, PageShell } from "@/components/site/page";

export const Route = createFileRoute("/investment-estimator")({
  head: () => ({
    meta: [
      { title: "Investment Estimator — THE CASSTLE CO" },
      {
        name: "description",
        content: "Model returns across land, plots and emerging Indian markets with an illustrative investment calculator.",
      },
      { property: "og:title", content: "Investment Estimator — THE CASSTLE CO" },
      {
        property: "og:description",
        content: "Estimate appreciation, yield and infrastructure-led upside before you commit.",
      },
    ],
  }),
  component: InvestmentEstimator,
});

function InvestmentEstimator() {
  const [activeTab, setActiveTab] = useState<'INVESTMENT' | 'RENTAL' | 'LOAN'>('INVESTMENT');

  return (
    <PageShell>
      <PageHeader
        eyebrow="Perspective"
        title="Own beautifully. Think clearly."
        intro="Second homes can be emotional purchases. We help you evaluate them with both lifestyle and financial considerations."
        variant="dark"
      />

      <div className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
          <div className="flex flex-wrap gap-2 mb-16">
            <button 
              onClick={() => setActiveTab('INVESTMENT')} 
              className={`px-5 py-3 text-[0.65rem] font-medium tracking-[0.15em] uppercase border transition-colors ${activeTab === 'INVESTMENT' ? 'border-gold text-gold bg-transparent' : 'border-border text-muted-foreground hover:border-gold/50 hover:text-foreground bg-transparent'}`}
            >
              Investment Calculator
            </button>
            <button 
              onClick={() => setActiveTab('RENTAL')} 
              className={`px-5 py-3 text-[0.65rem] font-medium tracking-[0.15em] uppercase border transition-colors ${activeTab === 'RENTAL' ? 'border-gold text-gold bg-transparent' : 'border-border text-muted-foreground hover:border-gold/50 hover:text-foreground bg-transparent'}`}
            >
              Rental Yield Calculator
            </button>
            <button 
              onClick={() => setActiveTab('LOAN')} 
              className={`px-5 py-3 text-[0.65rem] font-medium tracking-[0.15em] uppercase border transition-colors ${activeTab === 'LOAN' ? 'border-gold text-gold bg-transparent' : 'border-border text-muted-foreground hover:border-gold/50 hover:text-foreground bg-transparent'}`}
            >
              Loan Repayment Calculator
            </button>
          </div>

          {activeTab === 'INVESTMENT' && <InvestmentTab />}
          {activeTab === 'RENTAL' && <RentalTab />}
          {activeTab === 'LOAN' && <LoanTab />}
        </div>
      </div>
    </PageShell>
  );
}

function InvestmentTab() {
  const [price, setPrice] = useState(47500000);
  const [location, setLocation] = useState('Jim Corbett');
  const [type, setType] = useState('Private Villa');
  const [years, setYears] = useState(7);
  const [rentalDays, setRentalDays] = useState(30);
  const [appreciation, setAppreciation] = useState(8);

  const annualOwnershipCost = price * 0.01705; // 1.705%
  const nights = Math.round(365 * (rentalDays / 100));
  const rentalIncome = nights * 20163; 
  const grossYield = (rentalIncome / price) * 100;
  const netCarry = ((rentalIncome - annualOwnershipCost) / price) * 100;
  
  const val5y = price * Math.pow(1 + appreciation/100, 5);
  const valXy = price * Math.pow(1 + appreciation/100, years);
  const oasisNumber = Math.min(10, (appreciation * 0.6 + netCarry * 1.2)).toFixed(1);

  const inrL = (n: number) => "₹" + (n / 100000).toFixed(2) + " L";
  const inrCr = (n: number) => "₹" + (n / 10000000).toFixed(2) + " Cr";
  const formatPrice = (n: number) => n >= 10000000 ? inrCr(n) : inrL(n);

  return (
    <div className="grid gap-16 lg:grid-cols-[1fr_420px] items-start">
      <div className="space-y-12 max-w-3xl">
        <p className="eyebrow text-gold mb-10">The Estimator</p>
        <Slider label="Purchase Price" value={formatPrice(price)} min={5000000} max={150000000} step={250000} raw={price} onChange={setPrice} />
        
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col">
            <label className="eyebrow text-muted-foreground mb-4 block">Location</label>
            <select className="bg-transparent border-b border-border pb-2 outline-none text-sm font-medium" value={location} onChange={e => setLocation(e.target.value)}>
              <option>Jim Corbett</option>
              <option>Goa</option>
              <option>Alibaug</option>
              <option>Shimla</option>
              <option>Kasauli</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="eyebrow text-muted-foreground mb-4 block">Property Type</label>
            <select className="bg-transparent border-b border-border pb-2 outline-none text-sm font-medium" value={type} onChange={e => setType(e.target.value)}>
              <option>Private Villa</option>
              <option>Farmhouse</option>
              <option>Plot</option>
              <option>Apartment</option>
            </select>
          </div>
        </div>
        
        <Slider label="Holding Period" value={`${years} years`} min={1} max={15} step={1} raw={years} onChange={setYears} />
        <Slider label="Rental Days" value={`${rentalDays}% of the year - ~${nights} nights`} min={0} max={100} step={5} raw={rentalDays} onChange={setRentalDays} />
        <Slider label="Expected Rate of Appreciation" value={`${appreciation}% per annum`} min={0} max={20} step={1} raw={appreciation} onChange={setAppreciation} />
      </div>

      <div className="border border-border p-10 bg-background/50 relative">
        <p className="eyebrow text-gold">Estimated Ownership Profile</p>
        <p className="mt-8 font-display text-4xl lg:text-5xl text-primary">{formatPrice(price)}</p>
        <p className="mt-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Purchase Value</p>
        
        <div className="w-10 h-px bg-gold my-8"></div>

        <div className="space-y-1 text-sm">
          <div className="flex justify-between py-3 border-b border-border/50"><span className="text-muted-foreground">Estimated annual ownership cost</span><span className="font-medium text-right">{inrL(annualOwnershipCost)}</span></div>
          <div className="flex justify-between py-3 border-b border-border/50"><span className="text-muted-foreground">Short-term rental nights</span><span className="font-medium text-right">{nights} nights ({rentalDays}% of the year)</span></div>
          <div className="flex justify-between py-3 border-b border-border/50"><span className="text-muted-foreground">Potential annual rental income</span><span className="font-medium text-right">{inrL(rentalIncome)}</span></div>
          <div className="flex justify-between py-3 border-b border-border/50"><span className="text-muted-foreground">Gross rental yield</span><span className="font-medium text-right">{grossYield.toFixed(2)}% of purchase value</span></div>
          <div className="flex justify-between py-3 border-b border-border/50"><span className="text-muted-foreground">Net carry after ownership cost</span><span className="font-medium text-right">{netCarry.toFixed(2)}% per annum</span></div>
          <div className="flex justify-between py-3 border-b border-border/50"><span className="text-muted-foreground">5-year Indicative value</span><span className="font-medium text-right">{formatPrice(val5y)}</span></div>
          <div className="flex justify-between py-3 border-b border-border/50"><span className="text-muted-foreground">Value at {years} years</span><span className="font-medium text-right">{formatPrice(valXy)}</span></div>
        </div>

        <div className="mt-10 bg-secondary/30 p-8 border border-border/50">
           <p className="eyebrow text-muted-foreground mb-6">The Oasis Number</p>
           <p className="text-gold italic font-display text-2xl mb-4">{oasisNumber} / 10</p>
           <div className="w-full h-px bg-border my-6"></div>
           <p className="text-sm font-medium mb-4">Strongly viable — the assumptions support both carry and long-term value.</p>
           <p className="text-[0.65rem] leading-relaxed text-muted-foreground">The Oasis Number is a single objective read on viability, from 1 to 10 — the higher the number, the more viable the ownership case. It weighs your expected rate of appreciation, the net carry after annual ownership costs, the gross rental yield at your chosen rental days, and the rental resilience of the property type. A high number means the property is likely to hold its own financially; a low number means the case rests mainly on how much you will use and enjoy it.</p>
        </div>
        <p className="mt-8 text-[0.6rem] text-muted-foreground leading-relaxed">Indicative and illustrative only. Figures are model outputs based on the assumptions you have selected and do not represent guaranteed returns, rental income or resale values. Please seek independent financial and legal advice.</p>
        
        <div className="mt-10 flex flex-col gap-4">
           <a href="https://wa.me/919310698305" target="_blank" rel="noopener noreferrer" className="btn-base btn-solid w-full text-xs py-4 bg-primary hover:bg-primary/90 text-primary-foreground border-none">Speak to an advisor</a>
           <button className="btn-base btn-outline w-full text-xs py-4 bg-transparent border-border hover:border-gold">Understand the opportunity</button>
        </div>
      </div>
    </div>
  )
}

function RentalTab() {
  const [price, setPrice] = useState(47500000);
  const [nightlyRate, setNightlyRate] = useState(18000);
  const [rentalDays, setRentalDays] = useState(30);
  const [ownershipCostPct, setOwnershipCostPct] = useState(1.4);

  const nights = Math.round(365 * (rentalDays / 100));
  const grossIncome = nights * nightlyRate;
  const netIncome = (grossIncome * 0.72) - (price * ownershipCostPct / 100);
  const grossYield = (grossIncome / price) * 100;
  const netYield = (netIncome / price) * 100;

  const inrL = (n: number) => "₹" + (n / 100000).toFixed(2) + " L";
  const inrCr = (n: number) => "₹" + (n / 10000000).toFixed(2) + " Cr";
  const formatPrice = (n: number) => n >= 10000000 ? inrCr(n) : inrL(n);

  return (
    <div className="grid gap-16 lg:grid-cols-[1fr_420px] items-start">
      <div className="space-y-12 max-w-3xl">
        <p className="eyebrow text-gold mb-10">Rental Yield</p>
        <Slider label="Purchase Price" value={formatPrice(price)} min={5000000} max={150000000} step={250000} raw={price} onChange={setPrice} />
        <Slider label="Average Nightly Rate" value={`₹${nightlyRate.toLocaleString()}`} min={5000} max={100000} step={500} raw={nightlyRate} onChange={setNightlyRate} />
        <Slider label="Rental Days" value={`${rentalDays}% of the year - ~${nights} nights`} min={0} max={100} step={5} raw={rentalDays} onChange={setRentalDays} />
        <Slider label="Annual Ownership Cost" value={`${ownershipCostPct.toFixed(1)}% of value`} min={0} max={5} step={0.1} raw={ownershipCostPct} onChange={setOwnershipCostPct} />
      </div>

      <div className="border border-border p-10 bg-background/50 relative">
        <p className="eyebrow text-gold">Indicative Yield</p>
        <p className="mt-8 font-display text-4xl lg:text-5xl text-primary">{netYield.toFixed(2)}%</p>
        <p className="mt-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Net yield per annum</p>
        
        <div className="w-10 h-px bg-gold my-8"></div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-4 border-b border-border/50"><span className="text-muted-foreground">Nights rented</span><span className="font-medium text-right">{nights} nights</span></div>
          <div className="flex justify-between py-4 border-b border-border/50"><span className="text-muted-foreground">Gross rental income</span><span className="font-medium text-right">{inrL(grossIncome)}</span></div>
          <div className="flex justify-between py-4 border-b border-border/50"><span className="text-muted-foreground">Net income after costs</span><span className="font-medium text-right">{inrL(netIncome)}</span></div>
          <div className="flex justify-between py-4 border-b border-border/50"><span className="text-muted-foreground">Gross yield</span><span className="font-medium text-right">{grossYield.toFixed(2)}%</span></div>
        </div>

        <p className="mt-10 text-[0.6rem] text-muted-foreground leading-relaxed">Illustrative only. Assumes a 28% deduction for platform, housekeeping and management costs on gross rental income.</p>
      </div>
    </div>
  )
}

function LoanTab() {
  const [price, setPrice] = useState(47500000);
  const [downPaymentPct, setDownPaymentPct] = useState(30);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const downPayment = price * (downPaymentPct / 100);
  const loanAmount = price - downPayment;
  const r = (interestRate / 100) / 12;
  const n = tenure * 12;
  const emi = loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const totalOutflow = emi * n;
  const totalInterest = totalOutflow - loanAmount;

  const inrL = (num: number) => "₹" + (num / 100000).toFixed(2) + " L";
  const inrCr = (num: number) => "₹" + (num / 10000000).toFixed(2) + " Cr";
  const formatPrice = (num: number) => num >= 10000000 ? inrCr(num) : inrL(num);

  return (
    <div className="grid gap-16 lg:grid-cols-[1fr_420px] items-start">
      <div className="space-y-12 max-w-3xl">
        <p className="eyebrow text-gold mb-10">Loan Repayment</p>
        <Slider label="Purchase Price" value={formatPrice(price)} min={5000000} max={150000000} step={250000} raw={price} onChange={setPrice} />
        <Slider label="Down Payment" value={`${downPaymentPct}% - ${formatPrice(downPayment)}`} min={10} max={90} step={5} raw={downPaymentPct} onChange={setDownPaymentPct} />
        <Slider label="Interest Rate" value={`${interestRate.toFixed(1)}% per annum`} min={5} max={15} step={0.1} raw={interestRate} onChange={setInterestRate} />
        <Slider label="Tenure" value={`${tenure} years`} min={5} max={30} step={1} raw={tenure} onChange={setTenure} />
      </div>

      <div className="border border-border p-10 bg-background/50 relative">
        <p className="eyebrow text-gold">Monthly Commitment</p>
        <p className="mt-8 font-display text-4xl lg:text-5xl text-primary">{inrL(emi)}</p>
        <p className="mt-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Estimated Monthly Instalment</p>
        
        <div className="w-10 h-px bg-gold my-8"></div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-4 border-b border-border/50"><span className="text-muted-foreground">Loan amount</span><span className="font-medium text-right">{formatPrice(loanAmount)}</span></div>
          <div className="flex justify-between py-4 border-b border-border/50"><span className="text-muted-foreground">Total Interest payable</span><span className="font-medium text-right">{formatPrice(totalInterest)}</span></div>
          <div className="flex justify-between py-4 border-b border-border/50"><span className="text-muted-foreground">Total outflow over tenure</span><span className="font-medium text-right">{formatPrice(totalOutflow)}</span></div>
        </div>

        <p className="mt-10 text-[0.6rem] text-muted-foreground leading-relaxed">Illustrative only. Actual rates, eligibility, processing charges and taxes vary by lender.</p>
      </div>
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  raw,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  raw: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block w-full">
      <span className="flex items-baseline justify-between mb-4">
        <span className="eyebrow text-muted-foreground block">{label}</span>
        <span className="font-sans font-medium text-sm text-foreground">{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={raw}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--gold)] outline-none h-1 bg-border rounded-lg appearance-none cursor-pointer"
      />
    </label>
  );
}
