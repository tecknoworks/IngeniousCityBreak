using BusinessLayer;
using BusinessLogic;
using Contracts;
using DataAccessLayer;
using Microsoft.Practices.Unity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IngeniousCityBreakWeb
{
    public class DependencyInjectionContainer
    {
        public UnityContainer unityContainer;
        private static DependencyInjectionContainer dependencyInjectionContainer;
        private DependencyInjectionContainer()
        {
            unityContainer = new UnityContainer();
            MapTypes(dependencyInjectionContainer);
        }

        public static DependencyInjectionContainer GetInstance (){
            if (dependencyInjectionContainer == null){
                dependencyInjectionContainer = new DependencyInjectionContainer();
            }
            return dependencyInjectionContainer;
        }

        public T Resolve<T>()
        {

            T res = unityContainer.Resolve<T>();
            return res;
        }

        public void MapTypes(DependencyInjectionContainer dependencyInjectionContainer) {
            Register<IUserManager, UserManager>();
            Register<IDbRepository<ApplicationUser>, DbRepository < ApplicationUser >>();
          //  Register<IUserDetailsManager, UserDetailsManager>();
            Register<IDbRepository<UserDetails>, DbRepository<UserDetails>>();
            Register<IDbRepository<ApplicationUser>, DbRepository<ApplicationUser>>();
        }

        public void Register<Interface, Implemantation>() where Implemantation: Interface {
            unityContainer.RegisterType<Interface,Implemantation>();
        }
    }
}
