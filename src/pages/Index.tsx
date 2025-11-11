import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [calculatorData, setCalculatorData] = useState({
    service: '',
    area: '',
    premises: ''
  });
  const [price, setPrice] = useState<number | null>(null);

  const services = [
    {
      id: 'disinfection',
      title: 'Дезинфекция',
      description: 'Уничтожение бактерий, вирусов и грибков',
      icon: 'Droplets',
      price: 50
    },
    {
      id: 'disinsection',
      title: 'Дезинсекция',
      description: 'Уничтожение насекомых: тараканов, клопов, муравьёв',
      icon: 'Bug',
      price: 60
    },
    {
      id: 'deratization',
      title: 'Дератизация',
      description: 'Уничтожение грызунов: крыс, мышей',
      icon: 'Rat',
      price: 70
    },
    {
      id: 'herbicide',
      title: 'Гербицидная обработка',
      description: 'Уничтожение сорных растений на территории',
      icon: 'Leaf',
      price: 40
    },
    {
      id: 'larvicide',
      title: 'Ларвицидная обработка',
      description: 'Уничтожение личинок насекомых',
      icon: 'BadgeAlert',
      price: 55
    },
    {
      id: 'ozone',
      title: 'Озонирование',
      description: 'Очистка и дезодорация помещений озоном',
      icon: 'Wind',
      price: 45
    }
  ];

  const calculatePrice = () => {
    if (!calculatorData.service || !calculatorData.area || !calculatorData.premises) {
      toast.error('Заполните все поля для расчёта');
      return;
    }

    const serviceData = services.find(s => s.id === calculatorData.service);
    const basePrice = serviceData?.price || 50;
    const area = parseInt(calculatorData.area);
    const premisesMultiplier = calculatorData.premises === 'residential' ? 1 : 1.3;
    
    const total = Math.round(basePrice * area * premisesMultiplier);
    setPrice(total);
    toast.success('Стоимость рассчитана!');
  };

  return (
    <div className="min-h-screen">
      <header className="bg-secondary text-white sticky top-0 z-50 shadow-lg">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={32} className="text-primary" />
              <span className="text-2xl font-bold">Охотники за насекомыми</span>
            </div>
            <div className="hidden md:flex gap-6">
              <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
              <a href="#calculator" className="hover:text-primary transition-colors">Калькулятор</a>
              <a href="#about" className="hover:text-primary transition-colors">О компании</a>
              <a href="#guarantees" className="hover:text-primary transition-colors">Гарантии</a>
              <a href="#faq" className="hover:text-primary transition-colors">Вопросы</a>
              <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
            </div>
            <Button 
              onClick={() => window.location.href = 'tel:+79503049007'}
              className="bg-accent hover:bg-accent/90"
            >
              <Icon name="Phone" size={18} className="mr-2" />
              Позвонить
            </Button>
          </div>
        </nav>
      </header>

      <section className="relative bg-gradient-to-br from-secondary via-secondary/95 to-primary text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://cdn.poehali.dev/projects/74ab87cf-986b-4dfd-b855-dc1f8e743769/files/7663834e-ab68-4e61-894a-383548712fcb.jpg" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary text-white border-0">Профессиональные услуги</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Комплексная санитарная обработка помещений
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Дезинфекция, дезинсекция, дератизация и другие виды обработки с гарантией результата
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white text-lg"
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="Calculator" size={20} className="mr-2" />
                Рассчитать стоимость
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-secondary text-lg"
                onClick={() => window.location.href = 'tel:+79503049007'}
              >
                <Icon name="Phone" size={20} className="mr-2" />
                +7 (950) 304-90-07
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Наши услуги</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Профессиональная обработка помещений любого типа с использованием сертифицированных препаратов
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card 
                key={service.id} 
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">от {service.price} ₽/м²</span>
                    <Button 
                      variant="ghost" 
                      className="text-primary hover:text-primary hover:bg-primary/10"
                      onClick={() => {
                        setCalculatorData({ ...calculatorData, service: service.id });
                        document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Заказать
                      <Icon name="ArrowRight" size={18} className="ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Калькулятор стоимости</h2>
              <p className="text-lg text-muted-foreground">
                Узнайте примерную стоимость услуги за 1 минуту
              </p>
            </div>
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="service" className="text-base">Выберите услугу</Label>
                    <Select 
                      value={calculatorData.service} 
                      onValueChange={(value) => setCalculatorData({ ...calculatorData, service: value })}
                    >
                      <SelectTrigger id="service" className="mt-2">
                        <SelectValue placeholder="Выберите тип обработки" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map(service => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="area" className="text-base">Площадь помещения (м²)</Label>
                    <Input 
                      id="area"
                      type="number" 
                      placeholder="Например: 50"
                      className="mt-2"
                      value={calculatorData.area}
                      onChange={(e) => setCalculatorData({ ...calculatorData, area: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="premises" className="text-base">Тип помещения</Label>
                    <Select 
                      value={calculatorData.premises}
                      onValueChange={(value) => setCalculatorData({ ...calculatorData, premises: value })}
                    >
                      <SelectTrigger id="premises" className="mt-2">
                        <SelectValue placeholder="Выберите тип помещения" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Жилое помещение</SelectItem>
                        <SelectItem value="commercial">Коммерческое помещение</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={calculatePrice} 
                    size="lg" 
                    className="w-full text-lg"
                  >
                    <Icon name="Calculator" size={20} className="mr-2" />
                    Рассчитать стоимость
                  </Button>

                  {price !== null && (
                    <div className="bg-primary/10 border-2 border-primary rounded-lg p-6 text-center animate-scale-in">
                      <p className="text-lg text-muted-foreground mb-2">Примерная стоимость:</p>
                      <p className="text-4xl font-bold text-primary mb-4">{price.toLocaleString()} ₽</p>
                      <Button 
                        size="lg" 
                        className="bg-accent hover:bg-accent/90"
                        onClick={() => window.location.href = 'tel:+79503049007'}
                      >
                        <Icon name="Phone" size={20} className="mr-2" />
                        Позвонить и заказать
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">О компании ООО «Дез-сервис»</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Мы — профессиональная компания «Охотники за насекомыми», специализирующаяся на санитарной обработке помещений. 
                Работаем на рынке более 10 лет и выполнили более 5000 заказов.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Award" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">Сертифицированные специалисты</h3>
                    <p className="text-muted-foreground">Все наши сотрудники имеют необходимые лицензии и сертификаты</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="ShieldCheck" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">Безопасные препараты</h3>
                    <p className="text-muted-foreground">Используем только сертифицированные средства, безопасные для людей и животных</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">Быстрое выполнение</h3>
                    <p className="text-muted-foreground">Выезжаем на объект в день обращения, работаем круглосуточно</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://cdn.poehali.dev/projects/74ab87cf-986b-4dfd-b855-dc1f8e743769/files/0faeb724-5d6e-42ef-b265-393c9c972dc2.jpg" 
                alt="Наше оборудование" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="guarantees" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Наши гарантии</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Мы берём на себя ответственность за качество работы
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'FileCheck', title: 'Договор с гарантией', desc: 'Официальный договор на все виды работ' },
              { icon: 'RotateCcw', title: 'Повторная обработка', desc: 'Бесплатно при необходимости' },
              { icon: 'BadgeCheck', title: 'Гарантия результата', desc: 'До 12 месяцев в зависимости от услуги' },
              { icon: 'HeartHandshake', title: 'Страхование', desc: 'Застрахована ответственность компании' }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Часто задаваемые вопросы</h2>
              <p className="text-lg text-muted-foreground">
                Ответы на популярные вопросы о наших услугах
              </p>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white border-2 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Безопасны ли используемые препараты?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Да, мы используем только сертифицированные препараты 4-го класса опасности (малоопасные). 
                  Они безопасны для людей и домашних животных при соблюдении рекомендаций.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white border-2 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Как долго длится обработка?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Время обработки зависит от площади и типа помещения. В среднем обработка квартиры 
                  занимает 30-60 минут, коммерческого помещения — от 1 до 3 часов.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white border-2 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Когда можно вернуться в помещение?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  После обработки помещение должно проветриваться 2-3 часа. Затем проводится влажная уборка, 
                  и можно возвращаться. Подробные инструкции даст специалист.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white border-2 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Какая гарантия на услуги?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Гарантия зависит от вида обработки: дезинсекция и дератизация — до 12 месяцев, 
                  дезинфекция — до 6 месяцев. При необходимости проводим повторную обработку бесплатно.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white border-2 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Работаете ли вы в выходные?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Да, мы работаем без выходных, 24/7. Можете вызвать специалиста в любое удобное для вас время, 
                  включая ночные часы.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Контакты</h2>
              <p className="text-lg text-muted-foreground">
                Свяжитесь с нами удобным способом
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name="Phone" size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Телефон</CardTitle>
                  <CardDescription className="text-lg">Звоните в любое время</CardDescription>
                </CardHeader>
                <CardContent>
                  <a href="tel:+79503049007" className="text-2xl font-bold text-primary hover:underline">
                    +7 (950) 304-90-07
                  </a>
                  <p className="text-muted-foreground mt-2">Работаем 24/7 без выходных</p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name="Mail" size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Email</CardTitle>
                  <CardDescription className="text-lg">Напишите нам письмо</CardDescription>
                </CardHeader>
                <CardContent>
                  <a href="mailto:zhdanovrt@mail.ru" className="text-2xl font-bold text-primary hover:underline">
                    zhdanovrt@mail.ru
                  </a>
                  <p className="text-muted-foreground mt-2">Ответим в течение часа</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Готовы начать?</h3>
              <p className="text-xl mb-8 opacity-90">
                Позвоните нам или рассчитайте стоимость онлайн
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 text-lg"
                  onClick={() => window.location.href = 'tel:+79503049007'}
                >
                  <Icon name="Phone" size={20} className="mr-2" />
                  Позвонить сейчас
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg"
                  onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать стоимость
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={24} className="text-primary" />
              <span className="text-xl font-bold">Охотники за насекомыми</span>
            </div>
            <p className="text-white/70">© 2024 ООО «Дез-сервис». Все права защищены.</p>
            <div className="flex gap-4">
              <a href="tel:+79503049007" className="hover:text-primary transition-colors">
                <Icon name="Phone" size={24} />
              </a>
              <a href="mailto:zhdanovrt@mail.ru" className="hover:text-primary transition-colors">
                <Icon name="Mail" size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;