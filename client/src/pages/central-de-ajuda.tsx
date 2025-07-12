import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CentralDeAjuda() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Central de Ajuda</h1>
        <p className="text-gray-600">
          Encontre respostas para as principais dúvidas sobre nossos produtos e serviços
        </p>
      </div>

      {/* Contact Options */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <CardHeader>
            <Phone className="h-8 w-8 mx-auto text-blue-600" />
            <CardTitle className="text-lg">Telefone</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-2">(11) 3456-7890</p>
            <p className="text-sm text-gray-500">Seg-Sex: 8h às 18h</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Mail className="h-8 w-8 mx-auto text-green-600" />
            <CardTitle className="text-lg">E-mail</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-2">contato@kerasys.com.br</p>
            <p className="text-sm text-gray-500">Resposta em até 24h</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <MessageCircle className="h-8 w-8 mx-auto text-purple-600" />
            <CardTitle className="text-lg">WhatsApp</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-2">(11) 99999-9999</p>
            <p className="text-sm text-gray-500">Seg-Sex: 8h às 18h</p>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Perguntas Frequentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Como funciona o frete grátis?</AccordionTrigger>
              <AccordionContent>
                O frete grátis é aplicado automaticamente para compras acima de R$ 199,00 para todo o Brasil. 
                O prazo de entrega varia conforme a região, sendo de 3 a 7 dias úteis para capitais e regiões metropolitanas.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Qual o prazo de entrega?</AccordionTrigger>
              <AccordionContent>
                O prazo de entrega varia conforme a região:
                <ul className="list-disc ml-4 mt-2">
                  <li>Capitais e regiões metropolitanas: 3 a 7 dias úteis</li>
                  <li>Interior: 5 a 10 dias úteis</li>
                  <li>Regiões Norte e Nordeste: 7 a 15 dias úteis</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Como posso trocar ou devolver um produto?</AccordionTrigger>
              <AccordionContent>
                Você tem até 7 dias após o recebimento para trocar ou devolver qualquer produto. 
                O produto deve estar em perfeito estado, na embalagem original. 
                Entre em contato conosco através dos canais de atendimento para solicitar a troca ou devolução.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>Os produtos são originais?</AccordionTrigger>
              <AccordionContent>
                Sim! Todos os nossos produtos são 100% originais e importados diretamente da Kerasys Coreia do Sul. 
                Somos distribuidores oficiais no Brasil e oferecemos garantia de originalidade em todos os produtos.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>Como acompanhar meu pedido?</AccordionTrigger>
              <AccordionContent>
                Após a confirmação do pagamento, você receberá um código de rastreamento por e-mail. 
                Você pode acompanhar seu pedido através do site dos Correios ou entrando em contato conosco 
                através dos canais de atendimento.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger>Quais formas de pagamento vocês aceitam?</AccordionTrigger>
              <AccordionContent>
                Aceitamos as seguintes formas de pagamento:
                <ul className="list-disc ml-4 mt-2">
                  <li>PIX (com 10% de desconto)</li>
                  <li>Cartão de crédito (Visa, Mastercard, American Express)</li>
                  <li>Cartão de débito</li>
                  <li>Boleto bancário</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Still need help */}
      <Card className="mt-8 text-center">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2">Ainda precisa de ajuda?</h3>
          <p className="text-gray-600 mb-4">
            Nossa equipe está pronta para ajudar você com qualquer dúvida
          </p>
          <Button className="bg-black hover:bg-gray-800">
            Falar com Atendimento
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}