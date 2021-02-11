import { Resolver, Arg, UseMiddleware, Subscription, Root } from 'type-graphql';
import { isAuth, logger } from '../../middleware';
import { Notification } from '../../entity/Notification';

@Resolver()
export class NotificationResolver {
    @UseMiddleware(isAuth, logger)
    @Subscription(() => Notification,
        {
            topics: 'NOTIFICATION',
        })
    newNotification(
        @Root() payload: Notification,
        @Arg('user') user: string
    ): Notification | undefined {
        console.log(`Payload: ${payload}`);
        if (payload.note.user === user) { 
            return payload
        }

        return undefined;
    }
}