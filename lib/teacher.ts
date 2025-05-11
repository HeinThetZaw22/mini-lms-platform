export const isTeacher = (userId?: string | null) => {
  console.log(userId)
  return true;
  // return userId === process.env.NEXT_PUBLIC_TEACHER_ID;
};
