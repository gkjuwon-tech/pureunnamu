import type { Metadata } from "next";
import PageBanner from "@/components/ui/PageBanner";
import SubNav from "@/components/ui/SubNav";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { IconAdult, IconChild, IconTeen } from "@/components/icons";

export const metadata: Metadata = {
  title: "개인심리치료",
  description:
    "푸른나무 심리센터 개인심리치료 안내 - 우울증, ADHD, 강박증, 사회공포증, 틱장애, 분리불안, 조울증, 외상 후 스트레스 장애 등. 아동·청소년·성인·가족 맞춤 상담. 청주 심리상담.",
  keywords: ["우울증상담", "ADHD상담", "강박증치료", "사회공포증", "청주 아동상담", "청소년상담", "가족상담", "부부상담", "틱장애", "분리불안"],
  alternates: { canonical: "/programs/targets" },
  openGraph: {
    title: "심리치료의 대상 | 푸른나무 심리센터",
    description: "우울증, ADHD, 강박증, 사회공포증, 틱장애 등 다양한 심리치료 대상 안내",
    url: "/programs/targets",
  },
};

const programSubNav = [
  { label: "심리치료란?", href: "/programs/therapy" },
  { label: "심리검사", href: "/programs/assessment" },
  { label: "개인심리치료", href: "/programs/targets" },
  { label: "가족심리치료", href: "/programs/family" },
  { label: "사회성그룹치료", href: "/programs/group-therapy" },
  { label: "인지학습치료", href: "/programs/cognitive-learning" },
];

const adultTargets = [
  { name: "조울증", desc: "기분이 가라앉았다 들뜨기를 반복하며 감정의 기복이 심해요." },
  { name: "우울증", desc: "삶에 의욕이 없고 기분이 침체되며 한숨이 자주 나오고 까닭없이 화가 나며 죽고싶기도 해요." },
  { name: "강박증", desc: "행동이 경직되고 규칙과 질서를 지나치게 강조하며, 융통성이 없고 완벽한 일처리를 원해요." },
  { name: "편집증", desc: "다른 사람을 믿지 못하고 의심이 많으며, 말 뒤에 숨어있는 뜻을 밝히려 노력하고 과민해요." },
  { name: "의처·의부증", desc: "자신의 배우자를 믿지 못하고 끊임없이 의심하고, 감시하는 눈길을 보내요." },
  { name: "건강염려증", desc: "신체적 건강에 강한 집착을 보이고, 병에 걸린 것이 아닌가 걱정, 두려움으로 미세한 아픈 통증에도 민감하게 반응하며, 섭취한 음식들의 재료, 흡수량 등을 기록하기도 해요." },
  { name: "사회공포증", desc: "사람들 앞에서 얘기하려면, 손에 땀이 나고 목소리가 떨려서 아예 도망하고 말아요." },
  { name: "반사회적 성격", desc: "다른 사람에게 피해를 끼치고도 죄책감을 느끼지 않으며, 사회와 타인에 대한 불만이 매우 높아요." },
  { name: "회피·의존적 성격", desc: "자신의 중요한 일에 대해 스스로 결단하기 어려워하고 보호받고 싶은 욕구가 강하며 다른 사람의 욕구에 자신을 맞추는 경우가 많아요." },
  { name: "자기애적 성격", desc: "매 순간 내가 주인공이고 싶고, 나의 의견에 반대하거나 굴욕을 주었다고 느끼는 대상에게 화가 나며 아랫사람에겐 착취적으로 행동해요." },
  { name: "외상 후 스트레스 장애", desc: "충격적인 사건을 겪은 후, 그 사건이 뇌리에서 떠나지 않고 수시로 장면이 떠오르며 일상생활에 겁이 많아지고 성격의 변화를 느껴요." },
];

const childTargets = [
  { name: "분리 불안", desc: "학교, 유치원에 가기 싫어요. 엄마에게서 떨어지기 힘들어해요." },
  { name: "내성적·위축", desc: "매사에 자신이 없고 목소리도 작으며 또래와 잘 어울리지 못해요." },
  { name: "주의력 결핍 과잉행동", desc: "잠시도 가만히 있지 못하고 산만하며 과제에 집중하지 못해요." },
  { name: "충동성", desc: "깊이 생각하지 않고 행동이 먼저 튀어나오며 실수가 잦아요." },
  { name: "우울", desc: "표정이 밝지 못하고 의욕이 없어요. 안절부절하지 못하고 반항, 짜증, 울음이 잦아요." },
  { name: "틱 장애", desc: "얼굴을 실룩거리거나 눈 깜빡임, 어깨 움찔거리기 등의 운동성 틱과 특정단어 말하기, 욕설 등의 음성 틱이 있어요." },
  { name: "야뇨증", desc: "소변을 잘 가리다가 갑자기 밤에 잠자리에 실수하는 일이 잦아졌어요." },
  { name: "야경증", desc: "밤에 자다가 깜짝 놀라듯 일어나 소리쳐 울어요." },
  { name: "자폐증", desc: "마치 자신만의 세계에 갇혀 있는 듯 외부인과 소통이 안돼요." },
  { name: "학교폭력 피해", desc: "학교에 가기 싫어하고 원인 모를 상처, 멍 자국이 발견되며, 옷, 학용품 등이 자주 없어지고 친구에게 주었다고 말해요." },
  { name: "학교폭력 가해", desc: "거짓말을 잘하고 부모에게 숨기는 것이 많아요. 평소 욕설, 공격적 행동이 많으며 남을 놀리기를 좋아해요." },
];

const teenTargets = [
  { name: "학교 부적응", desc: "학교에 가기 싫어하고 휴학, 자퇴, 검정고시에 대한 얘기를 자주해요." },
  { name: "따돌림", desc: "또래와 잘 어울리지 못하고 친구가 없어요. 간혹 거짓말하고 학교에 가지 않는 경우도 있어요." },
  { name: "우울", desc: "표정이 어둡고 자신감이 결여되며 성적도 저하되고 의욕이 없어요." },
  { name: "도벽", desc: "자기 것이 아닌 물건이 자주 발견되고 집안의 푼돈이 자주 분실돼요." },
  { name: "사회공포", desc: "여럿 앞에 서면 말문이 막히고 발표 차례가 되면 너무 떨려서 머릿속이 하얘져요." },
  { name: "피해의식", desc: "타인의 시선에 민감하고 사고가 부정적이며 남이 자신을 욕하는 것 같다는 말을 자주해요." },
  { name: "거식증", desc: "다이어트에 과도하게 신경쓰고 말랐는데도 자신이 뚱뚱하다고 하며 식사를 거르기 일쑤에요." },
  { name: "품행장애", desc: "교사, 부모, 웃어른에게 말대꾸, 욕설, 구타도 서슴지 않고 술, 담배, 유흥업소 출입 등 성인에게만 허락된 행동을 하고자 해요." },
];

function TargetCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="bg-white/50 border border-primary/[0.06] rounded-2xl p-5 hover:bg-white/70 hover:border-primary/15 transition-all duration-500">
      <h4 className="font-semibold text-primary mb-1.5 text-sm">{name}</h4>
      <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

export default function TargetsPage() {
  return (
    <div>
      <PageBanner title="개인심리치료" breadcrumb={["프로그램", "개인심리치료"]} />

      <div className="max-w-5xl mx-auto px-4 py-14">
        <SubNav items={programSubNav} />

        {/* 성인 */}
        <AnimatedSection>
          <div className="paper-card rounded-3xl p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-primary/40"><IconAdult size={32} /></span>
              <div>
                <h2 className="text-2xl font-bold text-primary heading-serif">성인</h2>
                <p className="text-text-muted text-xs tracking-wider">Adult</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {adultTargets.map((t) => (
                <TargetCard key={t.name} name={t.name} desc={t.desc} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 아동 */}
        <AnimatedSection delay={100}>
          <div className="paper-card rounded-3xl p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-primary/40"><IconChild size={32} /></span>
              <div>
                <h2 className="text-2xl font-bold text-primary heading-serif">아동</h2>
                <p className="text-text-muted text-xs tracking-wider">Children</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {childTargets.map((t) => (
                <TargetCard key={t.name} name={t.name} desc={t.desc} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 청소년 */}
        <AnimatedSection delay={200}>
          <div className="paper-card rounded-3xl p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-primary/40"><IconTeen size={32} /></span>
              <div>
                <h2 className="text-2xl font-bold text-primary heading-serif">청소년</h2>
                <p className="text-text-muted text-xs tracking-wider">Adolescent</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {teenTargets.map((t) => (
                <TargetCard key={t.name} name={t.name} desc={t.desc} />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
