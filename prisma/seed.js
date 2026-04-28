import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const ids = {
    users: {
      admin: "11111111-1111-4111-8111-111111111111",
      john: "22222222-2222-4222-8222-222222222222",
    },
    exercises: {
      benchPress: "33333333-3333-4333-8333-333333333333",
      squat: "44444444-4444-4444-8444-444444444444",
      deadlift: "55555555-5555-4555-8555-555555555555",
      pullUp: "66666666-6666-4666-8666-666666666666",
    },
    workouts: {
      chestDay: "77777777-7777-4777-8777-777777777777",
      legDay: "88888888-8888-4888-8888-888888888888",
      fullBody: "99999999-9999-4999-8999-999999999999",
    },
    workoutLogs: {
      chestBench: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
      legSquat: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
      adminDeadlift: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
      adminPullUp: "dddddddd-dddd-4ddd-8ddd-dddddddddddd",
    },
  };

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
      id: ids.users.admin,
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
      id: ids.users.john,
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
    data: { id: ids.exercises.benchPress, name: "Bench Press", muscle_group: "Chest" },
  });

  const squat = await prisma.exercise.create({
    data: { id: ids.exercises.squat, name: "Squat", muscle_group: "Legs" },
  });

  const deadlift = await prisma.exercise.create({
    data: { id: ids.exercises.deadlift, name: "Deadlift", muscle_group: "Back" },
  });

  const pullUp = await prisma.exercise.create({
    data: { id: ids.exercises.pullUp, name: "Pull Up", muscle_group: "Back" },
  });

  // Create workouts for regular user
  const chestWorkout = await prisma.workout.create({
    data: {
      id: ids.workouts.chestDay,
      user_id: user.id,
      name: "Chest Day",
      description: "Upper body chest workout",
    },
  });

  const legWorkout = await prisma.workout.create({
    data: {
      id: ids.workouts.legDay,
      user_id: user.id,
      name: "Leg Day",
      description: "Lower body workout",
    },
  });

  // Create workouts for admin
  const adminWorkout = await prisma.workout.create({
    data: {
      id: ids.workouts.fullBody,
      user_id: admin.id,
      name: "Full Body",
      description: "Full body workout",
    },
  });

  // Create workout logs
  await prisma.workoutLog.create({
    data: {
      id: ids.workoutLogs.chestBench,
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
      id: ids.workoutLogs.legSquat,
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
      id: ids.workoutLogs.adminDeadlift,
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
      id: ids.workoutLogs.adminPullUp,
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
  console.log("John workout IDs:");
  console.log(`- Chest Day: ${ids.workouts.chestDay}`);
  console.log(`- Leg Day: ${ids.workouts.legDay}`);
  console.log("Admin workout ID:");
  console.log(`- Full Body: ${ids.workouts.fullBody}`);
  console.log("Exercise IDs:");
  console.log(`- Bench Press: ${ids.exercises.benchPress}`);
  console.log(`- Squat: ${ids.exercises.squat}`);
  console.log(`- Deadlift: ${ids.exercises.deadlift}`);
  console.log(`- Pull Up: ${ids.exercises.pullUp}`);
  console.log("Workout log IDs:");
  console.log(`- John's Bench Log: ${ids.workoutLogs.chestBench}`);
  console.log(`- John's Squat Log: ${ids.workoutLogs.legSquat}`);
  console.log(`- Admin's Deadlift Log: ${ids.workoutLogs.adminDeadlift}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
