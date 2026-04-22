import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.ts";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clean existing data
  await prisma.workoutLog.deleteMany();
  await prisma.workout.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);

  const admin = await prisma.user.create({
    data: {
      first_name: "Admin",
      last_name: "User",
      email: "admin@example.com",
      password_hash: adminPassword,
      fitness_goal: "Maintain fitness",
      role: "ADMIN",
    },
  });

  const user = await prisma.user.create({
    data: {
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      password_hash: userPassword,
      fitness_goal: "Build muscle",
      role: "USER",
    },
  });

  // Create exercises
  const benchPress = await prisma.exercise.create({
    data: { name: "Bench Press", muscle_group: "Chest" },
  });

  const squat = await prisma.exercise.create({
    data: { name: "Squat", muscle_group: "Legs" },
  });

  const deadlift = await prisma.exercise.create({
    data: { name: "Deadlift", muscle_group: "Back" },
  });

  const pullUp = await prisma.exercise.create({
    data: { name: "Pull Up", muscle_group: "Back" },
  });

  // Create workouts for regular user
  const chestWorkout = await prisma.workout.create({
    data: {
      user_id: user.id,
      name: "Chest Day",
      description: "Upper body chest workout",
    },
  });

  const legWorkout = await prisma.workout.create({
    data: {
      user_id: user.id,
      name: "Leg Day",
      description: "Lower body workout",
    },
  });

  // Create workouts for admin
  const adminWorkout = await prisma.workout.create({
    data: {
      user_id: admin.id,
      name: "Full Body",
      description: "Full body workout",
    },
  });

  // Create workout logs
  await prisma.workoutLog.create({
    data: {
      workout_id: chestWorkout.id,
      exercise_id: benchPress.id,
      sets: 3,
      reps: 10,
      weight: 135,
      notes: "Felt strong today",
    },
  });

  await prisma.workoutLog.create({
    data: {
      workout_id: legWorkout.id,
      exercise_id: squat.id,
      sets: 4,
      reps: 8,
      weight: 185,
      notes: "Good form",
    },
  });

  await prisma.workoutLog.create({
    data: {
      workout_id: adminWorkout.id,
      exercise_id: deadlift.id,
      sets: 3,
      reps: 5,
      weight: 225,
      notes: "New PR",
    },
  });

  await prisma.workoutLog.create({
    data: {
      workout_id: adminWorkout.id,
      exercise_id: pullUp.id,
      sets: 3,
      reps: 12,
      weight: 0,
      notes: "Bodyweight",
    },
  });

  console.log("Database seeded successfully!");
  console.log("Admin - email: admin@example.com | password: admin123");
  console.log("User  - email: john@example.com  | password: user123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
