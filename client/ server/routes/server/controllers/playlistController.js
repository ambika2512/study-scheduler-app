exports.createPlan = async (req, res) => {
  const { totalMinutes, topics, days } = req.body;
  const minutesPerDay = Math.ceil(totalMinutes / days);
  let minutesRemaining = totalMinutes;
  const schedule = [];

  for (let i = 1; i <= days; i++) {
    const share = Math.min(minutesPerDay, minutesRemaining);
    const topicsToday = topics.slice((i - 1) * Math.ceil(topics.length / days), i * Math.ceil(topics.length / days));
    schedule.push({
      day: i,
      minutes: share,
      topics: topicsToday
    });
    minutesRemaining -= share;
  }

  return res.json({ totalMinutes, topics, days, schedule });
};
