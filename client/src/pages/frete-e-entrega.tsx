import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, MapPin, Clock, Package2 } from "lucide-react";

export default function FreteEEntrega() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Frete e Entrega</h1>
        <p className="text-gray-600">
          Informações sobre entrega, prazos e custos de frete
        </p>
      </div>

      <div className="space-y-8">
        {/* Frete Grátis */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Truck className="h-5 w-5" />
              Frete Grátis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-green-700">
              <p className="text-lg font-semibold mb-2">
                🚚 Frete grátis para compras acima de R$ 199,00
              </p>
              <p>
                Válido para todo o Brasil. O desconto é aplicado automaticamente no checkout 
                quando o valor mínimo for atingido.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Prazos de Entrega */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Prazos de Entrega
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700 mb-4">
                Os prazos de entrega são calculados em dias úteis, a partir da confirmação do pagamento:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-700">Região Sudeste</h4>
                    <p className="text-gray-600">3 a 5 dias úteis</p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-green-700">Região Sul</h4>
                    <p className="text-gray-600">3 a 7 dias úteis</p>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-semibold text-yellow-700">Região Centro-Oeste</h4>
                    <p className="text-gray-600">5 a 8 dias úteis</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-orange-700">Região Nordeste</h4>
                    <p className="text-gray-600">7 a 12 dias úteis</p>
                  </div>
                  
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold text-red-700">Região Norte</h4>
                    <p className="text-gray-600">10 a 15 dias úteis</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                <p className="text-yellow-800 text-sm">
                  ⚠️ Prazos podem variar durante feriados, Black Friday, Natal e outras datas especiais.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custos de Frete */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package2 className="h-5 w-5 text-purple-600" />
              Custos de Frete
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700">
                Para compras abaixo de R$ 199,00, o frete é calculado conforme o peso e destino:
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Região</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Até 1kg</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">1kg a 3kg</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">3kg a 5kg</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Sudeste</td>
                      <td className="border border-gray-200 px-4 py-2">R$ 15,90</td>
                      <td className="border border-gray-200 px-4 py-2">R$ 22,90</td>
                      <td className="border border-gray-200 px-4 py-2">R$ 29,90</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">Sul</td>
                      <td className="border border-gray-200 px-4 py-2">R$ 19,90</td>
                      <td className="border border-gray-200 px-4 py-2">R$ 27,90</td>
                      <td className="border border-gray-200 px-4 py-2">R$ 35,90</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Centro-Oeste</td>
                      <td className="border border-gray-200 px-4 py-2">R$ 24,90</td>
                      <td className="border border-gray-200 px-4 py-2">R$ 32,90</td>
                      <td className="border border-gray-200 px-4 py-2">R$ 42,90</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">Nordeste</td>
                      <td className="border border-gray-200 px-4 py-2">R$ 29,90</td>
                      <td className="border border-gray-200 px-4 py-2">R$ 39,90</td>
                      <td className="border border-gray-200 px-4 py-2">R$ 49,90</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Norte</td>
                      <td className="border border-gray-200 px-4 py-2">R$ 34,90</td>
                      <td className="border border-gray-200 px-4 py-2">R$ 44,90</td>
                      <td className="border border-gray-200 px-4 py-2">R$ 54,90</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formas de Envio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Formas de Envio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Correios - PAC</h4>
                  <p className="text-gray-600">
                    Entrega padrão com rastreamento incluso. Mais econômico.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Package2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Correios - SEDEX</h4>
                  <p className="text-gray-600">
                    Entrega expressa com rastreamento. Mais rápido (disponível mediante consulta).
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações Importantes */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Importantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Código de rastreamento:</strong> Enviado por e-mail após a postagem do produto.
              </p>
              <p>
                <strong>Tentativas de entrega:</strong> Os Correios fazem até 3 tentativas de entrega.
              </p>
              <p>
                <strong>Produto não retirado:</strong> Produtos não retirados retornam ao remetente após 30 dias.
              </p>
              <p>
                <strong>Endereço incorreto:</strong> Verificar sempre os dados de entrega antes de finalizar o pedido.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}