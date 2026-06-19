import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "changeme1234";
  const name = process.env.ADMIN_NAME || "소장";

  if (password.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters.");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const existing = await prisma.adminUser.findUnique({ where: { username } });
  if (existing) {
    await prisma.adminUser.update({
      where: { username },
      data: { passwordHash, name },
    });
    console.log(`✓ Admin '${username}' password updated.`);
  } else {
    await prisma.adminUser.create({
      data: { username, passwordHash, name },
    });
    console.log(`✓ Admin '${username}' created.`);
  }

  console.log(`Login URL: /admin/login    username=${username}`);

  await seedTherapists();
}

// 치료사 소개 자료 (클라이언트 제공). 이름 기준 idempotent upsert.
const THERAPISTS = [
  {
    name: "조현양",
    title: "상담심리사",
    sortOrder: 1,
    bio: [
      "[학력]",
      "서울불교대학원대학교 석사학위",
      "",
      "[소속]",
      "한국상담심리학회 정회원",
      "",
      "[자격]",
      "한상심 상담심리사 2급 / 청소년 상담사 3급",
      "",
      "[주요경력]",
      "청소년 상담, 성인상담, 부모교육, 청소년 집단상담",
      "임상기간 10년",
    ].join("\n"),
  },
  {
    name: "김다솜",
    title: "인지행동치료사",
    sortOrder: 2,
    bio: [
      "[학력]",
      "명지대학교 일반대학원 아동가족심리치료 석사 / 동대학원 박사 과정 중",
      "",
      "[소속]",
      "한국상담학회 정회원 / 한국인지행동치료상담학회 정회원",
      "",
      "[자격]",
      "임상심리사 2급 / 미술치료사 1급",
      "",
      "[논문]",
      "청소년의 사회불안이 SNS 중독 경향성에 미치는 영향 /",
      "SNS 상의 사회비교를 통한 외로움의 조절된 매개효과",
      "",
      "[주요경력]",
      "명지대 아동가족심리치료연구소(인지행동치료연구소) 인지행동치료사 등",
      "임상경력 5년",
    ].join("\n"),
  },
  {
    name: "최수현",
    title: "상담심리사",
    sortOrder: 3,
    bio: [
      "[학력]",
      "충북대학교 심리학과 박사학위",
      "",
      "[자격]",
      "가족심리상담사 1급 / 임상심리사 2급",
      "",
      "[논문]",
      "청소년의 마음읽기와 사회적 능력 /",
      "마음읽기 능력의 성인기 발달과 노년기 사회적 적응에 미치는 영향",
      "",
      "[주요경력]",
      "청주시청소년상담복지센터 / 보은군가족센터 / 사회복무연수센터",
    ].join("\n"),
  },
];

async function seedTherapists() {
  for (const t of THERAPISTS) {
    const existing = await prisma.therapist.findFirst({ where: { name: t.name } });
    if (existing) {
      await prisma.therapist.update({ where: { id: existing.id }, data: t });
    } else {
      await prisma.therapist.create({ data: t });
    }
  }
  console.log(`✓ Therapists seeded (${THERAPISTS.length}).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
