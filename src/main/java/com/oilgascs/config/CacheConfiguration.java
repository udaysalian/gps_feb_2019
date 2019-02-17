package com.oilgascs.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.oilgascs.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.oilgascs.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.Nomination.class.getName(), jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.Nomination.class.getName() + ".priorities", jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.ReductionReason.class.getName(), jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.Activity.class.getName(), jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.RateSched.class.getName(), jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.RateSched.class.getName() + ".rtSchedValds", jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.RateSchedVald.class.getName(), jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.NominationPriority.class.getName(), jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.Contract.class.getName(), jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.Contract.class.getName() + ".contrLocs", jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.ContrLoc.class.getName(), jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.BusinessAssociate.class.getName(), jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.BusinessAssociate.class.getName() + ".contracts", jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.BusinessAssociate.class.getName() + ".businessAssociateAddresses", jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.BusinessAssociateAddress.class.getName(), jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.MeasurementStation.class.getName(), jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.LocationBA.class.getName(), jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.Contact.class.getName(), jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.BusinessUnit.class.getName(), jcacheConfiguration);
            cm.createCache(com.oilgascs.domain.BusinessAssociateContact.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
