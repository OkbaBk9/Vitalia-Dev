"use client"

export default function Privacy() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="hero-title mb-8">سياسة الخصوصية</h1>
        
        <div className="glass-card rounded-3xl p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">مقدمة</h2>
            <p className="text-muted-foreground leading-relaxed">
              تحترم أوقبة سرفيسز خصوصيتك وتلتزم بحماية بيانات الأشخاص التي تتلقاها. تشرح هذه السياسة كيفية جمع واستخدام معلوماتك الشخصية.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">المعلومات التي نجمعها</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>الاسم والبريد الإلكتروني ورقم الهاتف</li>
              <li>معلومات الطلب والفاتورة</li>
              <li>بيانات الاستخدام والتفضيلات</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">كيفية استخدام معلوماتك</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>تقديم الخدمات المطلوبة</li>
              <li>التواصل معك بشأن طلبك</li>
              <li>تحسين خدماتنا</li>
              <li>الامتثال للالتزامات القانونية</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">الحماية</h2>
            <p className="text-muted-foreground leading-relaxed">
              نتخذ تدابير أمنية مناسبة لحماية بيانات الأشخاص ضد الوصول غير المصرح به أو التعديل أو الحذف أو الكشف.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">حقوقك</h2>
            <p className="text-muted-foreground leading-relaxed">
              لديك الحق في الوصول إلى بيانات الأشخاص التي نحتفظ بها عنك وتصحيحها أو حذفها. يمكنك التواصل معنا في أي وقت للقيام بذلك.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">الاتصال بنا</h2>
            <p className="text-muted-foreground">
              إذا كان لديك أي أسئلة حول سياسة الخصوصية، يرجى التواصل معنا على:
            </p>
            <p className="text-blue-600 font-medium mt-2">okbaservices09@gmail.com</p>
          </section>
        </div>
      </div>
    </main>
  )
}
