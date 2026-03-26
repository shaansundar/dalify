type LogLevel = "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  action?: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

function formatEntry(entry: LogEntry): string {
  return JSON.stringify(entry);
}

function log(
  level: LogLevel,
  message: string,
  context?: { action?: string; userId?: string; metadata?: Record<string, unknown> },
) {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...context,
  };

  const output = formatEntry(entry);

  switch (level) {
    case "error":
      console.error(output);
      break;
    case "warn":
      console.warn(output);
      break;
    default:
      console.log(output);
  }
}

export const logger = {
  info: (message: string, context?: { action?: string; userId?: string; metadata?: Record<string, unknown> }) =>
    log("info", message, context),
  warn: (message: string, context?: { action?: string; userId?: string; metadata?: Record<string, unknown> }) =>
    log("warn", message, context),
  error: (message: string, context?: { action?: string; userId?: string; metadata?: Record<string, unknown> }) =>
    log("error", message, context),
};
