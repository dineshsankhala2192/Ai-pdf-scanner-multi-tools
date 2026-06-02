import React, { useState } from 'react';

export function Calculators({ toolId }: { toolId: string }) {
  if (toolId === 'calc-age') return <AgeCalculator />;
  if (toolId === 'calc-emi') return <EMICalculator />;
  if (toolId === 'calc-sip') return <SIPCalculator />;
  if (toolId === 'calc-bmi') return <BMICalculator />;
  if (toolId === 'calc-hourly') return <HourlyRateCalculator />;
  if (toolId === 'calc-yt-rev') return <YouTubeRevenueCalculator />;
  if (toolId === 'calc-roi') return <ROICalculator />;
  if (toolId === 'calc-discount') return <DiscountCalculator />;
  if (toolId === 'calc-loan-comp') return <LoanComparator />;
  return null;
}

function InputField({ label, ...props }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-cyan-accent">{label}</label>
      <input 
        className="w-full bg-btn border border-cyan-accent/30 rounded p-2 text-main-white focus:outline-none focus:border-cyan-accent transition-colors"
        {...props}
      />
    </div>
  );
}

function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    if (!dob) return;
    const birthDate = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }
    if (days < 0) {
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    setResult(`You are ${years} years, ${months} months, and ${days} days old.`);
  };

  return (
    <div className="space-y-4">
      <InputField label="Date of Birth" type="date" value={dob} onChange={(e: any) => setDob(e.target.value)} />
      <button onClick={calculate} className="w-full bg-cyan-accent text-main font-bold py-2 rounded hover:glow-shadow transition-shadow">Calculate Age</button>
      {result && <div className="p-4 mt-4 bg-btn border border-cyan-accent/50 rounded text-center text-cyan-alt text-lg">{result}</div>}
    </div>
  );
}

function EMICalculator() {
  const [loan, setLoan] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const P = parseFloat(loan);
    const R = parseFloat(rate) / 12 / 100;
    const N = parseFloat(months);
    if (!P || !R || !N) return;
    
    // EMI = P x R x (1+R)^N / ((1+R)^N - 1)
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setResult(`Monthly EMI: $${emi.toFixed(2)}`);
  };

  return (
    <div className="space-y-4">
      <InputField label="Loan Amount ($)" type="number" value={loan} onChange={(e: any) => setLoan(e.target.value)} />
      <InputField label="Annual Interest Rate (%)" type="number" value={rate} onChange={(e: any) => setRate(e.target.value)} />
      <InputField label="Tenure (Months)" type="number" value={months} onChange={(e: any) => setMonths(e.target.value)} />
      <button onClick={calculate} className="w-full bg-cyan-accent text-main font-bold py-2 rounded hover:glow-shadow transition-shadow">Calculate EMI</button>
      {result && <div className="p-4 mt-4 bg-btn border border-cyan-accent/50 rounded text-center text-cyan-alt text-xl">{result}</div>}
    </div>
  );
}

function SIPCalculator() {
  const [investment, setInvestment] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const P = parseFloat(investment);
    const i = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;
    if (!P || !i || !n) return;
    
    // FV = P × ({[1 + i]^n - 1} / i) × (1 + i)
    const fv = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    setResult(`Estimated Returns: $${fv.toFixed(2)}`);
  };

  return (
    <div className="space-y-4">
      <InputField label="Monthly Investment ($)" type="number" value={investment} onChange={(e: any) => setInvestment(e.target.value)} />
      <InputField label="Expected Annual Return (%)" type="number" value={rate} onChange={(e: any) => setRate(e.target.value)} />
      <InputField label="Investment Period (Years)" type="number" value={years} onChange={(e: any) => setYears(e.target.value)} />
      <button onClick={calculate} className="w-full bg-cyan-accent text-main font-bold py-2 rounded hover:glow-shadow transition-shadow">Calculate SIP</button>
      {result && <div className="p-4 mt-4 bg-btn border border-cyan-accent/50 rounded text-center text-cyan-alt text-xl">{result}</div>}
    </div>
  );
}

function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{ bmi: string, status: string } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // cm to m
    if (!w || !h) return;
    
    const bmiVal = w / (h * h);
    let status = '';
    if (bmiVal < 18.5) status = 'Underweight';
    else if (bmiVal < 24.9) status = 'Normal weight';
    else if (bmiVal < 29.9) status = 'Overweight';
    else status = 'Obese';

    setResult({ bmi: bmiVal.toFixed(1), status });
  };

  return (
    <div className="space-y-4">
      <InputField label="Weight (kg)" type="number" value={weight} onChange={(e: any) => setWeight(e.target.value)} />
      <InputField label="Height (cm)" type="number" value={height} onChange={(e: any) => setHeight(e.target.value)} />
      <button onClick={calculate} className="w-full bg-cyan-accent text-main font-bold py-2 rounded hover:glow-shadow transition-shadow">Calculate BMI</button>
      {result && (
        <div className="p-4 mt-4 bg-btn border border-cyan-accent/50 rounded text-center flex flex-col gap-2">
          <span className="text-3xl text-cyan-accent font-bold">{result.bmi}</span>
          <span className="text-dim text-lg">Status: <span className="text-white">{result.status}</span></span>
        </div>
      )}
    </div>
  );
}

function HourlyRateCalculator() {
  const [income, setIncome] = useState('');
  const [hours, setHours] = useState('40');
  const [weeksOff, setWeeksOff] = useState('4');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const desiredIncome = parseFloat(income);
    const hrsPerWeek = parseFloat(hours);
    const wOff = parseFloat(weeksOff);
    if (!desiredIncome || !hrsPerWeek || isNaN(wOff)) return;

    const workingWeeks = 52 - wOff;
    const totalHours = workingWeeks * hrsPerWeek;
    if (totalHours <= 0) {
      setResult("Invalid hours/weeks arrangement.");
      return;
    }
    
    // Suggest adding 20-30% on top of net for gross margin/taxes for freelancers (optional, keeping it simple here)
    const hourlyRate = (desiredIncome / totalHours);
    setResult(`Minimum Hourly Rate: $${hourlyRate.toFixed(2)}`);
  };

  return (
    <div className="space-y-4">
      <InputField label="Desired Annual Income ($)" type="number" value={income} onChange={(e: any) => setIncome(e.target.value)} />
      <InputField label="Hours per Week" type="number" value={hours} onChange={(e: any) => setHours(e.target.value)} />
      <InputField label="Weeks Off per Year" type="number" value={weeksOff} onChange={(e: any) => setWeeksOff(e.target.value)} />
      <button onClick={calculate} className="w-full bg-cyan-accent text-main font-bold py-2 rounded hover:glow-shadow transition-shadow">Calculate Hourly Rate</button>
      {result && <div className="p-4 mt-4 bg-btn border border-cyan-accent/50 rounded text-center text-cyan-alt text-xl">{result}</div>}
    </div>
  );
}

function YouTubeRevenueCalculator() {
  const [dailyViews, setDailyViews] = useState('');
  const [cpm, setCpm] = useState('2.00'); // generic average RPM/CPM default
  const [result, setResult] = useState<{ daily: string, monthly: string, yearly: string } | null>(null);

  const calculate = () => {
    const views = parseFloat(dailyViews);
    const estimatedCpm = parseFloat(cpm);
    if (isNaN(views) || isNaN(estimatedCpm)) return;

    const dailyRevenue = (views / 1000) * estimatedCpm;
    const monthlyRevenue = dailyRevenue * 30;
    const yearlyRevenue = dailyRevenue * 365;

    setResult({
      daily: `$${dailyRevenue.toFixed(2)}`,
      monthly: `$${monthlyRevenue.toFixed(2)}`,
      yearly: `$${yearlyRevenue.toFixed(2)}`
    });
  };

  return (
    <div className="space-y-4">
      <InputField label="Daily Video Views" type="number" value={dailyViews} onChange={(e: any) => setDailyViews(e.target.value)} />
      <InputField label="Estimated CPM ($)" type="number" value={cpm} onChange={(e: any) => setCpm(e.target.value)} />
      <p className="text-xs text-dim -mt-2 mb-4">CPM (Cost Per Mille) is the estimated earnings per 1,000 views. Averages range from $1 to $5.</p>
      
      <button onClick={calculate} className="w-full bg-cyan-accent text-main font-bold py-2 rounded hover:glow-shadow transition-shadow">Estimate Revenue</button>
      {result && (
        <div className="p-4 mt-4 bg-btn border border-cyan-accent/50 rounded grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex flex-col gap-1">
            <span className="text-dim text-sm">Daily Earnings</span>
            <span className="text-xl text-cyan-accent font-bold">{result.daily}</span>
          </div>
          <div className="flex flex-col gap-1 sm:border-l sm:border-r border-white/10">
            <span className="text-dim text-sm">Monthly Earnings</span>
            <span className="text-xl text-cyan-accent font-bold">{result.monthly}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-dim text-sm">Yearly Earnings</span>
            <span className="text-xl text-cyan-accent font-bold">{result.yearly}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ROICalculator() {
  const [investment, setInvestment] = useState('');
  const [returned, setReturned] = useState('');
  const [result, setResult] = useState<{ roi: string, profit: string } | null>(null);

  const calculate = () => {
    const inv = parseFloat(investment);
    const ret = parseFloat(returned);
    if (isNaN(inv) || isNaN(ret) || inv === 0) return;

    const netProfit = ret - inv;
    const roiPercentage = (netProfit / inv) * 100;

    setResult({
      roi: `${roiPercentage.toFixed(2)}%`,
      profit: `$${netProfit.toFixed(2)}`
    });
  };

  return (
    <div className="space-y-4">
      <InputField label="Amount Invested ($)" type="number" value={investment} onChange={(e: any) => setInvestment(e.target.value)} />
      <InputField label="Amount Returned ($)" type="number" value={returned} onChange={(e: any) => setReturned(e.target.value)} />
      <button onClick={calculate} className="w-full bg-cyan-accent text-main font-bold py-2 rounded hover:glow-shadow transition-shadow">Calculate ROI</button>
      {result && (
        <div className="p-4 mt-4 bg-btn border border-cyan-accent/50 rounded flex flex-col gap-3 text-center">
          <div>
            <span className="text-dim block text-sm">Net Profit</span>
            <span className={`text-2xl font-bold ${parseFloat(result.profit.replace('$', '')) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {result.profit}
            </span>
          </div>
          <div>
            <span className="text-dim block text-sm">ROI Percentage</span>
            <span className="text-xl text-cyan-accent font-bold">{result.roi}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function DiscountCalculator() {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [result, setResult] = useState<{ finalPrice: string, saved: string } | null>(null);

  const calculate = () => {
    const p = parseFloat(price);
    const d = parseFloat(discount);
    if (isNaN(p) || isNaN(d) || p < 0 || d < 0 || d > 100) return;

    const savedAmount = p * (d / 100);
    const finalP = p - savedAmount;

    setResult({
      finalPrice: `$${finalP.toFixed(2)}`,
      saved: `$${savedAmount.toFixed(2)}`
    });
  };

  return (
    <div className="space-y-4">
      <InputField label="Original Price ($)" type="number" value={price} onChange={(e: any) => setPrice(e.target.value)} />
      <InputField label="Discount Percentage (%)" type="number" value={discount} onChange={(e: any) => setDiscount(e.target.value)} />
      <button onClick={calculate} className="w-full bg-cyan-accent text-main font-bold py-2 rounded hover:glow-shadow transition-shadow">Calculate Discount</button>
      {result && (
        <div className="p-4 mt-4 bg-btn border border-cyan-accent/50 rounded flex flex-col gap-3 text-center">
          <div>
            <span className="text-dim block text-sm">Amount Saved</span>
            <span className="text-xl text-green-400 font-bold">{result.saved}</span>
          </div>
          <div>
            <span className="text-dim block text-sm">Final Price</span>
            <span className="text-2xl text-cyan-accent font-bold">{result.finalPrice}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function LoanComparator() {
  const [loan1, setLoan1] = useState('');
  const [rate1, setRate1] = useState('');
  const [months1, setMonths1] = useState('');

  const [loan2, setLoan2] = useState('');
  const [rate2, setRate2] = useState('');
  const [months2, setMonths2] = useState('');

  const [result, setResult] = useState<{
    emi1: string, totalInt1: string, totalPay1: string,
    emi2: string, totalInt2: string, totalPay2: string
  } | null>(null);

  const calculate = () => {
    const P1 = parseFloat(loan1);
    const R1 = parseFloat(rate1) / 12 / 100;
    const N1 = parseFloat(months1);

    const P2 = parseFloat(loan2);
    const R2 = parseFloat(rate2) / 12 / 100;
    const N2 = parseFloat(months2);

    if (!P1 || !R1 || !N1 || !P2 || !R2 || !N2) return;

    const emiVal1 = (P1 * R1 * Math.pow(1 + R1, N1)) / (Math.pow(1 + R1, N1) - 1);
    const totalPay1 = emiVal1 * N1;
    const totalInt1 = totalPay1 - P1;

    const emiVal2 = (P2 * R2 * Math.pow(1 + R2, N2)) / (Math.pow(1 + R2, N2) - 1);
    const totalPay2 = emiVal2 * N2;
    const totalInt2 = totalPay2 - P2;

    setResult({
      emi1: `$${emiVal1.toFixed(2)}`,
      totalInt1: `$${totalInt1.toFixed(2)}`,
      totalPay1: `$${totalPay1.toFixed(2)}`,
      emi2: `$${emiVal2.toFixed(2)}`,
      totalInt2: `$${totalInt2.toFixed(2)}`,
      totalPay2: `$${totalPay2.toFixed(2)}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 p-4 bg-btn border border-cyan-accent/20 rounded">
          <h3 className="text-cyan-accent font-bold mb-2">Loan Option 1</h3>
          <InputField label="Loan Amount ($)" type="number" value={loan1} onChange={(e: any) => setLoan1(e.target.value)} />
          <InputField label="Annual Interest Rate (%)" type="number" value={rate1} onChange={(e: any) => setRate1(e.target.value)} />
          <InputField label="Tenure (Months)" type="number" value={months1} onChange={(e: any) => setMonths1(e.target.value)} />
        </div>
        <div className="space-y-4 p-4 bg-btn border border-cyan-accent/20 rounded">
          <h3 className="text-cyan-accent font-bold mb-2">Loan Option 2</h3>
          <InputField label="Loan Amount ($)" type="number" value={loan2} onChange={(e: any) => setLoan2(e.target.value)} />
          <InputField label="Annual Interest Rate (%)" type="number" value={rate2} onChange={(e: any) => setRate2(e.target.value)} />
          <InputField label="Tenure (Months)" type="number" value={months2} onChange={(e: any) => setMonths2(e.target.value)} />
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-cyan-accent text-main font-bold py-2 rounded hover:glow-shadow transition-shadow">Compare Loans</button>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="p-4 bg-btn border border-cyan-accent/50 rounded flex flex-col gap-3 text-center">
            <h4 className="font-bold text-cyan-accent border-b border-cyan-accent/20 pb-2">Option 1 Results</h4>
            <div>
              <span className="text-dim block text-sm">Monthly EMI</span>
              <span className="text-xl text-main-white font-bold">{result.emi1}</span>
            </div>
            <div>
              <span className="text-dim block text-sm">Total Interest</span>
              <span className="text-xl text-yellow-400 font-bold">{result.totalInt1}</span>
            </div>
            <div>
              <span className="text-dim block text-sm">Total Payment</span>
              <span className="text-xl text-cyan-accent font-bold">{result.totalPay1}</span>
            </div>
          </div>
          <div className="p-4 bg-btn border border-cyan-accent/50 rounded flex flex-col gap-3 text-center">
            <h4 className="font-bold text-cyan-accent border-b border-cyan-accent/20 pb-2">Option 2 Results</h4>
            <div>
              <span className="text-dim block text-sm">Monthly EMI</span>
              <span className="text-xl text-main-white font-bold">{result.emi2}</span>
            </div>
            <div>
              <span className="text-dim block text-sm">Total Interest</span>
              <span className="text-xl text-yellow-400 font-bold">{result.totalInt2}</span>
            </div>
            <div>
              <span className="text-dim block text-sm">Total Payment</span>
              <span className="text-xl text-cyan-accent font-bold">{result.totalPay2}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

