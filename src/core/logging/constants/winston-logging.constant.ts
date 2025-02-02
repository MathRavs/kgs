import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export const winstonLogger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    process.env.NODE_ENV === 'production'
      ? new DailyRotateFile({
          filename: 'logs/application-%DATE%.log', // Nom du fichier avec rotation
          datePattern: 'YYYY-MM-DD', // Rotation quotidienne
          zippedArchive: true, // Archive les anciens fichiers
          maxSize: '20m', // Taille maximale du fichier
          maxFiles: '14d', // Conserve les fichiers pendant 14 jours
        })
      : undefined,
    new transports.Console({
      format: format.combine(
        format.colorize(), // Ajoute des couleurs pour la console
        format.simple(), // Format simple pour la console
      ),
    }),
  ].filter(Boolean),
});
