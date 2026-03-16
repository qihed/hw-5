import { configure } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';

configure({
  useProxies: 'ifavailable',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
});

// Required for SSR: disable MobX reactivity during server render to prevent memory leaks
enableStaticRendering(typeof window === 'undefined');
