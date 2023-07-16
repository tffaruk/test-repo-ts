import path from "path";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, label, printf, prettyPrint } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  return `${date.toDateString()} ${hour}:${min}:${sec}  [${label}] ${level}: ${message}`;
});

const successlog = createLogger({
  level: "info",
  format: combine(
    label({ label: "right meow!" }),
    timestamp(),
    myFormat,
    prettyPrint()
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    // eslint-disable-next-line no-undef

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "success",
        "ght-success-%DATE%.log"
      ),
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
    new transports.Console(),
  ],
});

const errorlog = createLogger({
  level: "error",
  format: combine(
    label({ label: "right meow!" }),
    timestamp(),
    myFormat,
    prettyPrint()
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "error",
        "ght-error-%DATE%.log"
      ),
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
    new transports.Console(),
  ],
});

export default {
  successlog,
  errorlog,
};
