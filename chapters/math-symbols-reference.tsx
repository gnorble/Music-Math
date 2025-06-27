"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Search } from "lucide-react"
import { mathSymbols } from "@/data/course-data"

export function MathSymbolsReference() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSymbols = Object.entries(mathSymbols).filter(
    ([symbol, description]) =>
      symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Mathematical Symbols Reference</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search symbols or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {filteredSymbols.map(([symbol, description]) => (
              <div key={symbol} className="border-b pb-3 last:border-b-0">
                <h4 className="font-semibold text-lg mb-1 text-blue-900">{symbol}</h4>
                <p className="text-sm text-gray-700">{description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
