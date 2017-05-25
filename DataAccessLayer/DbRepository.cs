using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public interface IDbRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        T GetById(object Id);

        T GetByEmail(object Email);
        void Insert(T obj);
        void Update(T obj);
        void Delete(object Id);
        void Save();
    }
    public class DbRepository<T> : IDbRepository<T> where T : class
    {
        protected ApplicationDbContext db;
        private DbSet<T> dbSet;

        public DbRepository()
        {
            db = StContext.GetInstance().GetContext();
            dbSet = db.Set<T>();
        }
        public IEnumerable<T> GetAll()
        {
            return dbSet.ToList();
        }

        public T GetById(object Id)
        {
            return dbSet.Find(Id);
        }

        public T GetByEmail(object Email)
        {
            return dbSet.Find(Email);
        }

        public void Insert(T obj)
        {
            dbSet.Add(obj);
        }
        public void Update(T obj)
        {
            db.Entry(obj).State = EntityState.Modified;
        }
        public void Delete(object Id)
        {
            T getObjById = dbSet.Find(Id);
            dbSet.Remove(getObjById);
        }
        public void Save()
        {
            db.SaveChanges();
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (this.db != null)
                {
                    this.db.Dispose();
                    this.db = null;
                }
            }
        }
    }

}
