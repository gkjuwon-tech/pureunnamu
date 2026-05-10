"use client";

import { useState, FormEvent } from "react";
import PageBanner from "@/components/ui/PageBanner";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { SITE } from "@/lib/constants";
import { IconCheck, IconPhone, IconMail } from "@/components/icons";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    age: "",
    subject: "",
    content: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("전송 실패");

      setStatus("success");
      setForm({ name: "", phone: "", email: "", gender: "", age: "", subject: "", content: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      <PageBanner title="온라인문의" breadcrumb={["온라인문의"]} />

      <div className="max-w-4xl mx-auto px-4 py-14">
        {/* 안내 */}
        <AnimatedSection>
          <div className="bg-primary/[0.03] border border-primary/[0.06] rounded-3xl p-8 mb-10 text-center">
            <p className="text-text-muted leading-relaxed">
              궁금하신 점이 있으시면 아래 양식을 작성하여 문의해 주세요.
              <br />
              빠른 상담을 원하시면{" "}
              <a href={`tel:${SITE.phone}`} className="text-primary font-bold hover:underline">
                {SITE.phone}
              </a>
              으로 전화해 주세요.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="paper-card rounded-3xl p-8 md:p-12">
            <h2 className="text-xl font-bold text-primary mb-8 heading-serif">문의하기</h2>

            {status === "success" ? (
              <div className="text-center py-14">
                <div className="text-primary/40 mb-5 flex justify-center"><IconCheck size={44} /></div>
                <h3 className="text-xl font-bold text-primary mb-3 heading-serif">
                  문의가 접수되었습니다
                </h3>
                <p className="text-text-muted mb-6">
                  빠른 시일 내에 확인 후 연락드리겠습니다.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="bg-primary/90 text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-primary transition-all hover:shadow-lg hover:shadow-primary/15"
                >
                  추가 문의하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-text-main mb-1.5">
                      이름 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-primary/15 bg-white/60 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all text-sm"
                      placeholder="홍길동"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-main mb-1.5">
                      연락처 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-primary/15 bg-white/60 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all text-sm"
                      placeholder="010-0000-0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-text-main mb-1.5">
                      이메일
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-primary/15 bg-white/60 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all text-sm"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-main mb-1.5">성별</label>
                    <select
                      value={form.gender}
                      onChange={(e) => setForm({ ...form, gender: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-primary/15 bg-white/60 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all text-sm"
                    >
                      <option value="">선택</option>
                      <option value="여성">여성</option>
                      <option value="남성">남성</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-main mb-1.5">나이</label>
                    <input
                      type="number"
                      min={1}
                      max={120}
                      value={form.age}
                      onChange={(e) => setForm({ ...form, age: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-primary/15 bg-white/60 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all text-sm"
                      placeholder="만 나이"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-main mb-1.5">
                    제목 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-primary/15 bg-white/60 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all text-sm"
                    placeholder="문의 제목을 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-main mb-1.5">
                    문의 내용 <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-primary/15 bg-white/60 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all text-sm resize-none"
                    placeholder="문의하실 내용을 자세히 작성해 주세요."
                  />
                </div>

                {status === "error" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
                    문의 전송에 실패했습니다. 다시 시도해 주세요.
                  </div>
                )}

                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-primary/90 text-white px-10 py-3 rounded-full font-medium hover:bg-primary transition-all hover:shadow-lg hover:shadow-primary/15 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {status === "loading" ? "전송 중..." : "문의하기"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </AnimatedSection>

        {/* 연락처 정보 */}
        <AnimatedSection delay={200}>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="paper-card rounded-2xl p-6 text-center">
              <div className="text-primary/40 mb-3 flex justify-center"><IconPhone size={24} /></div>
              <h4 className="font-semibold text-primary text-sm mb-1.5">전화</h4>
              <a href={`tel:${SITE.phone}`} className="text-text-muted text-sm hover:text-primary transition-colors">
                {SITE.phone}
              </a>
            </div>
            <div className="paper-card rounded-2xl p-6 text-center">
              <div className="text-primary/40 mb-3 flex justify-center"><IconMail size={24} /></div>
              <h4 className="font-semibold text-primary text-sm mb-1.5">이메일</h4>
              <p className="text-text-muted text-sm">{SITE.email}</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
