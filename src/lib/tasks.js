import fetch from "node-fetch";

export async function getAllTasksData(uid) {
  const body = { uid: uid };
  const res = await fetch(
    new URL("http://localhost:5001/tasker-19a03/asia-northeast1/api/tasks"),
    {
      // Getメソッドではリクエストボディを送れないので、Postメソッド
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }
  );
  const tasks = await res.json();

  return tasks.contents;
}
