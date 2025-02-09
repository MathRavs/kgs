import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

export const winstonLogger = createLogger({
  level: 'debug',
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
        format.timestamp(),
        format.ms(),
        nestWinstonModuleUtilities.format.nestLike('MyApp', {
          colors: true,
          prettyPrint: true,
          processId: true,
          appName: true,
        }),
      ),
    }),
  ].filter(Boolean),
});
