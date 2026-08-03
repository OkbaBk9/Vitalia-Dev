"use client"

export default function Terms() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="hero-title mb-8">شروط الاستخدام</h1>
        
        <div className="glass-card rounded-3xl p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">مقدمة</h2>
            <p className="text-muted-foreground leading-relaxed">
              تحكم هذه الشروط استخدامك لخدمات أوقبة سرفيسز. باستخدامك للموقع والخدمات، أنت توافق على الامتثال لهذه الشروط.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">الخدمات</h2>
            <p className="text-muted-foreground leading-relaxed">
              تقدم أوقبة سرفيسز مجموعة من الخدمات المهنية. جودة الخدمات قد تختلف حسب نوع الطلب والمتطلبات. نحن نسعى دائماً لتقديم أفضل الخدمات.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">الأسعار والدفع</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>الأسعار قابلة للتغيير دون إشعار مسبق</li>
              <li>يجب الدفع قبل أو عند تسليم الخدمة</li>
              <li>نقبل طرق دفع متعددة</li>
              <li>استرجاع الأموال قد يتم في حالات محدودة</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">مسؤولية المستخدم</h2>
            <p className="text-muted-foreground leading-relaxed">
              أنت مسؤول عن دقة المعلومات التي تقدمها. يجب عدم استخدام خدماتنا لأي غرض غير قانوني أو ضار.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">الضمان والمسؤولية</h2>
            <p className="text-muted-foreground leading-relaxed">
              نضمن جودة خدماتنا. في حالة عدم رضاك، يمكننا إعادة تنفيذ الخدمة. لا نتحمل مسؤولية الأضرار غير المباشرة الناشئة عن استخدام خدماتنا.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">تعديل الشروط</h2>
            <p className="text-muted-foreground leading-relaxed">
              تحتفظ أوقبة سرفيسز بحق تعديل هذه الشروط في أي وقت. التعديلات الكبيرة ستكون لها فترة إشعار معقولة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">الاتصال بنا</h2>
            <p className="text-muted-foreground">
              إذا كان لديك أي أسئلة حول الشروط، يرجى التواصل معنا على:
            </p>
            <div className="mt-4 space-y-1 text-foreground">
              <p>البريد: okbaservices09@gmail.com</p>
              <p>الهاتف: 0780229481</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">القانون الحاكم</h2>
            <p className="text-muted-foreground leading-relaxed">
              تحكم هذه الشروط قوانين الجزائر. أي نزاع ينشأ سيتم حله وفقاً للقانون الجزائري.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
