import { Check } from "lucide-react";

const CodeReviewExample = () => {
  return (
    <div className="relative overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b p-3 bg-card">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <span className="text-sm font-medium">calculateTotal.js</span>
        <div className="h-4 w-4"></div>
      </div>
      <div className="p-4 font-mono text-sm relative overflow-hidden">
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="min-w-4 text-muted-foreground">1</div>
            <div><span className="text-[#0550ae]">function</span> <span className="text-[#6f42c1]">calculateTotal</span>({'{'}</div>
          </div>
          <div className="flex gap-3">
            <div className="min-w-4 text-muted-foreground">2</div>
            <div>&nbsp;&nbsp;<span className="text-[#0550ae]">const</span> items = cart.<span className="text-[#6f42c1]">getItems</span>();</div>
          </div>
          <div className="flex gap-3">
            <div className="min-w-4 text-muted-foreground">3</div>
            <div>&nbsp;&nbsp;<span className="text-[#0550ae]">let</span> total = <span className="text-[#005cc5]">0</span>;</div>
          </div>
          <div className="flex gap-3 bg-yellow-100/20 border-l-4 border-warning relative group">
            <div className="min-w-4 text-muted-foreground">4</div>
            <div>&nbsp;&nbsp;<span className="text-[#0550ae]">for</span> (<span className="text-[#0550ae]">let</span> i = <span className="text-[#005cc5]">0</span>; i {'<'} items.length; i++) {'{'}</div>
            <div className="absolute left-full ml-4 px-4 py-1 bg-warning/10 border border-warning/20 rounded-md text-foreground w-64 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm pointer-events-none">
              <div className="flex items-start gap-2 text-xs">
                <div className="flex-shrink-0 h-4 w-4 rounded-full bg-warning/20 text-warning flex items-center justify-center mt-0.5">
                  <span className="text-[0.6rem]">!</span>
                </div>
                <div className="leading-normal">
                  <strong>Performance warning:</strong> Consider using Array methods instead of traditional loops
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 relative group">
            <div className="min-w-4 text-muted-foreground">5</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;total += items[i].price;</div>
            <div className="absolute left-full ml-4 px-4 py-2 bg-card border rounded-md text-muted-foreground w-64 shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <span className="text-xs font-bold">AI</span>
                </div>
                <div className="text-xs leading-normal">
                  <strong>Suggestion:</strong> Using Array.reduce() would be more readable and less prone to off-by-one errors.
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 bg-yellow-100/20 border-l-4 border-warning">
            <div className="min-w-4 text-muted-foreground">6</div>
            <div>&nbsp;&nbsp;{'}'}</div>
          </div>
          <div className="flex gap-3">
            <div className="min-w-4 text-muted-foreground">7</div>
            <div>&nbsp;&nbsp;<span className="text-[#0550ae]">return</span> total;</div>
          </div>
          <div className="flex gap-3">
            <div className="min-w-4 text-muted-foreground">8</div>
            <div>{'}'}</div>
          </div>
          <div className="flex gap-3 mt-6">
            <div className="min-w-4"></div>
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg text-sm font-normal text-foreground w-full">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-success/20 text-success flex items-center justify-center">
                  <Check size={14} />
                </div>
                <div>
                  <p className="font-medium">InsightCode AI Suggestion</p>
                  <pre className="mt-2 p-3 bg-black/5 rounded-md overflow-x-auto">
                    {`function calculateTotal() {
  const items = cart.getItems();
  return items.reduce((total, item) => total + item.price, 0);
}`}
                  </pre>
                  <div className="mt-2 text-xs text-muted-foreground flex items-center justify-between">
                    <span>Cleaner code • Better performance • Functional approach</span>
                    <span className="text-success font-medium flex items-center gap-1">
                      <Check size={12} />
                      68% faster execution
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeReviewExample;