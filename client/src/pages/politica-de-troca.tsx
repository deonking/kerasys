import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Clock, Package } from "lucide-react";

export default function PoliticaDeTroca() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Política de Troca e Devolução</h1>
        <p className="text-gray-600">
          Conheça nossos termos para trocas e devoluções
        </p>
      </div>

      <div className="space-y-8">
        {/* Direito de Arrependimento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Direito de Arrependimento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Conforme o Código de Defesa do Consumidor, você tem direito ao arrependimento no prazo de 
              <strong> 7 dias corridos</strong> a partir da data de recebimento do produto.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 font-medium">
                💡 Importante: O prazo começa a contar a partir do recebimento do produto, não da data da compra.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Condições para Troca */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Condições para Troca ou Devolução
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700 mb-4">
                Para solicitar a troca ou devolução, o produto deve atender às seguintes condições:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-700">✅ Aceito para troca/devolução:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Produto na embalagem original</li>
                    <li>• Lacres e selos intactos</li>
                    <li>• Produto sem uso</li>
                    <li>• Nota fiscal ou comprovante de compra</li>
                    <li>• Dentro do prazo de 7 dias</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-red-700">❌ Não aceito para troca/devolução:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Produto com embalagem danificada</li>
                    <li>• Produto com sinais de uso</li>
                    <li>• Produto sem embalagem original</li>
                    <li>• Fora do prazo de 7 dias</li>
                    <li>• Produtos em promoção especial*</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                <p className="text-yellow-800 text-sm">
                  *Produtos em promoção especial podem ter condições diferenciadas. Consulte os termos específicos da promoção.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Como Solicitar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-purple-600" />
              Como Solicitar Troca ou Devolução
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h4 className="font-semibold">Passo a passo:</h4>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h5 className="font-medium">Entre em contato</h5>
                    <p className="text-gray-600">Envie um e-mail para contato@kerasys.com.br ou ligue para (11) 3456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h5 className="font-medium">Informe os dados</h5>
                    <p className="text-gray-600">Número do pedido, produto, motivo da troca/devolução</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h5 className="font-medium">Aguarde autorização</h5>
                    <p className="text-gray-600">Nossa equipe analisará sua solicitação em até 24h</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h5 className="font-medium">Envie o produto</h5>
                    <p className="text-gray-600">Após autorização, envie o produto para o endereço indicado</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                  <div>
                    <h5 className="font-medium">Receba o reembolso</h5>
                    <p className="text-gray-600">Após análise, o reembolso será processado em até 5 dias úteis</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações Importantes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Informações Importantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Frete de devolução:</strong> Quando a troca/devolução for por arrependimento, 
                o frete de devolução é por conta do cliente.
              </p>
              <p>
                <strong>Produto com defeito:</strong> Se o produto apresentar defeito de fabricação, 
                o frete de devolução é por nossa conta.
              </p>
              <p>
                <strong>Reembolso:</strong> O valor será estornado na mesma forma de pagamento utilizada 
                na compra (cartão, PIX, etc.).
              </p>
              <p>
                <strong>Prazo para reembolso:</strong> Até 5 dias úteis após recebermos e analisarmos o produto.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}