import 'dotenv/config';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// create ratelimit with maximum 3 requests in 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '10 s'),
});

export { ratelimit };
